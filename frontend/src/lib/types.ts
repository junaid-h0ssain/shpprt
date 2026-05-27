export interface User {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  productId: string;
  createdAt: string | Date;
  user?: Pick<User, "id" | "name" | "imageUrl"> | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  user?: Pick<User, "id" | "name" | "imageUrl"> | null;
  comments?: Comment[];
}

export interface ProductFormData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface SyncUserPayload {
  email: string;
  name: string;
  imageUrl: string;
}
