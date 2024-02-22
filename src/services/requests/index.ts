import { Product } from "@/@types/application";
import api from "../api";
import {
  AddItemToCartParams,
  AddItemToCartResponse,
  UpdateItemQuantityInCartParams,
  UpdateItemQuantityInCartResponse,
} from "./types";

export const getProducts = async () => {
  const { data } = await api.get<Product[]>("/movie");
  return data;
};

export const addItemToCart = async (params: AddItemToCartParams) => {
  const { data } = await api.post<AddItemToCartResponse>("/order", params);
  return data;
};

export const updateItemQuantityInCart = async (
  params: UpdateItemQuantityInCartParams
) => {
  const { data } = await api.patch<UpdateItemQuantityInCartResponse>(
    `/order/item/${params.id}`,
    params
  );
  return data;
};

export const removeItemInCart = async (id: string) => {
  await api.delete<UpdateItemQuantityInCartResponse>(`/order/item/${id}`);
  return;
};

export const buyOrder = async (orderId: string) => {
  await api.post(`/order/buy`, { orderId });
  return;
};
