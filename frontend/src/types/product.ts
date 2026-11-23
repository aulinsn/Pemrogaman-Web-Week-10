export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  name: string;
  price: number;
}
