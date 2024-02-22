import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";

// Components
import { Table } from "@/components/Table";

// Types
import { ProductInCart } from "@/@types/application";

// Helpers
import { formatPrice } from "@/helpers/formatPrice";

import {
  InputContainer,
  SubTotalContainer,
  ImageAndTitle,
  ActionButton,
} from "./styles";

type CartProviderProps = {
  product: ProductInCart;
  handleProductDecrement: (product: ProductInCart) => void;
  handleProductIncrement: (product: ProductInCart) => void;
  handleRemoveProduct: (productId: string) => void;
  isLoading: boolean;
};

export function CartProductRow({
  product,
  handleProductDecrement,
  handleProductIncrement,
  handleRemoveProduct,
  isLoading,
}: CartProviderProps) {
  return (
    <Table.Row key={product.id}>
      <ImageAndTitle>
        <img src={product.imageUrl} alt={product.title} />
        <div>
          <strong>{product.title}</strong>
          <span>{formatPrice(product.price)}</span>
        </div>
      </ImageAndTitle>
      <InputContainer>
        <ActionButton
          type="button"
          disabled={isLoading || product.quantity <= 1}
          onClick={() => handleProductDecrement(product)}
        >
          <MdRemoveCircleOutline size={20} />
        </ActionButton>
        <input
          type="text"
          data-testid="product-amount"
          readOnly
          value={product.quantity}
        />
        <ActionButton
          data-cy={'add'}
          type="button"
          onClick={() => handleProductIncrement(product)}
          disabled={isLoading}
        >
          <MdAddCircleOutline size={20} />
        </ActionButton>
      </InputContainer>
      <SubTotalContainer>
        <span>SUBTOTAL</span>
        <strong>{formatPrice(product.amount)}</strong>
      </SubTotalContainer>
      <ActionButton
        data-cy={'subtract'}
        type="button"
        onClick={() => handleRemoveProduct(product.id)}
        disabled={isLoading}
      >
        <MdDelete size={20} />
      </ActionButton>
    </Table.Row>
  );
}
