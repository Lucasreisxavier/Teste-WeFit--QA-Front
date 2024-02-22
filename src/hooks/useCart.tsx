import { createContext, ReactNode, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

// Types
import { CartOrder, Product, ProductInCart } from "@/@types/application";
import {
  addItemToCart,
  buyOrder,
  removeItemInCart,
  updateItemQuantityInCart,
} from "@/services/requests";

interface CartProviderProps {
  children: ReactNode;
}

export interface UpdateProductQuantity {
  productId: string;
  quantity: number;
}

interface CartContextData {
  cart: ProductInCart[];
  isPurchased: boolean;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductQuantity: ({
    productId,
    quantity,
  }: UpdateProductQuantity) => void;
  finishPurchase: () => Promise<boolean>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const dbKey = "@Wefit-Ecommerce:cartOrder";

  const [cartOrderState, setCartOrderState] = useState<CartOrder | null>(() => {
    const storagedCart = sessionStorage.getItem(dbKey);

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return null;
  });
  const [isPurchased, setPurchased] = useState(false);

  const addProduct = async (newProduct: Product) => {
    const isEmptyCartOrder = !cartOrderState;

    if (isEmptyCartOrder) {
      const addItemResponse = await addItemToCart({
        movieId: newProduct.id,
        quantity: 1,
      });

      const initialCartState = {
        id: addItemResponse.id,
        cart: [
          {
            ...newProduct,
            orderItemId: addItemResponse.orderItemId,
            amount: newProduct.price,
            quantity: 1,
          },
        ],
      };
      setCartOrderState(initialCartState);
      sessionStorage.setItem(dbKey, JSON.stringify(initialCartState));
      return;
    }

    const productInCart = cartOrderState.cart?.find(
      (product) => product.id === newProduct.id
    );

    if (!productInCart) {
      const addItemResponse = await addItemToCart({
        id: cartOrderState?.id,
        movieId: newProduct.id,
        quantity: 1,
      });

      const updatedCartState = {
        id: cartOrderState?.id ?? "",
        cart: [
          ...(cartOrderState?.cart || []),
          {
            ...newProduct,
            orderItemId: addItemResponse.orderItemId,
            amount: newProduct.price,
            quantity: 1,
          },
        ],
      };

      setCartOrderState(updatedCartState);
      sessionStorage.setItem(dbKey, JSON.stringify(updatedCartState));
      return;
    }

    const updateItemQuantityResponse = await updateItemQuantityInCart({
      id: productInCart.orderItemId,
      quantity: productInCart.quantity + 1,
    });

    const updatedCartState = {
      id: cartOrderState?.id ?? "",
      cart: cartOrderState?.cart?.map((cartItem) =>
        cartItem.id === newProduct.id
          ? {
              ...cartItem,
              quantity: updateItemQuantityResponse.quantity,
              amount: updateItemQuantityResponse.amount,
            }
          : cartItem
      ),
    };

    setCartOrderState(updatedCartState);
    sessionStorage.setItem(dbKey, JSON.stringify(updatedCartState));
  };

  const removeProduct = async (productId: string) => {
    const productInCart = cartOrderState?.cart?.find(
      (cartProduct) => cartProduct.id === productId
    );
    const notFoundProduct = !productInCart;

    if (notFoundProduct) {
      return new Error();
    }

    await removeItemInCart(productInCart?.orderItemId);

    const updatedCartState = {
      id: cartOrderState?.id ?? "",
      cart: cartOrderState?.cart?.filter(
        (cartItem) => cartItem.id !== productId
      ),
    };

    setCartOrderState(updatedCartState);
    sessionStorage.setItem(dbKey, JSON.stringify(updatedCartState));
  };

  const updateProductQuantity = async ({
    productId,
    quantity,
  }: UpdateProductQuantity) => {
    const productInCart = cartOrderState?.cart?.find(
      (cartProduct) => cartProduct.id === productId
    );
    const notFoundProduct = !productInCart;

    if (notFoundProduct) {
      throw new Error();
    }

    if (quantity < 1) {
      throw new Error();
    }

    const updateItemQuantityResponse = await updateItemQuantityInCart({
      id: productInCart.orderItemId,
      quantity: quantity,
    });

    const updatedCartState = {
      id: cartOrderState?.id ?? "",
      cart: cartOrderState?.cart?.map((cartItem) =>
        cartItem.id === productInCart.id
          ? {
              ...cartItem,
              quantity: updateItemQuantityResponse.quantity,
              amount: updateItemQuantityResponse.amount,
            }
          : cartItem
      ),
    };

    setCartOrderState(updatedCartState);
    sessionStorage.setItem(dbKey, JSON.stringify(updatedCartState));
  };

  const finishPurchase = async () => {
    const isCartEmpty = !cartOrderState || cartOrderState.cart?.length === 0;

    if (isCartEmpty) return false;

    setPurchased(true);

    await buyOrder(cartOrderState.id);

    setCartOrderState(null);

    sessionStorage.removeItem(dbKey);

    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartOrderState?.cart || [],
        isPurchased,
        addProduct,
        removeProduct,
        updateProductQuantity,
        finishPurchase,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
