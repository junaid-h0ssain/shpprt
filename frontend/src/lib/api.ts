import axios from "axios";
import type { ProductFormData, SyncUserPayload } from "./types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const syncUser = async (userData: SyncUserPayload) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get("/products/my");
  return data;
};

export const createProduct = async (productData: ProductFormData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: { id: string } & ProductFormData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
