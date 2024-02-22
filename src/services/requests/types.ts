export type AddItemToCartParams = {
  id?: string;
  movieId: string;
  quantity: number;
};

export type AddItemToCartResponse = {
  id: string;
  orderItemId: string;
};

export type UpdateItemQuantityInCartParams = {
  id?: string;
  quantity: number;
};

export type UpdateItemQuantityInCartResponse = {
  orderItemId: string;
  quantity: number;
  amount: number;
};
