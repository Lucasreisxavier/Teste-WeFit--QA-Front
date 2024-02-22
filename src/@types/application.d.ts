export type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

export interface ProductInCart extends Product {
  orderItemId: string;
  amount: number;
  quantity: number;
}

export type CartOrder = {
  id: string;
  cart?: ProductInCart[];
};
