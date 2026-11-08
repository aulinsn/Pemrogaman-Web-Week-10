import type { Request, Response } from "express";

// Versi minggu ke-9: data masih berupa array di memori Express
let nextId = 3;
export const products = [
  { id: 1, name: "Buku", price: 15000 },
  { id: 2, name: "Pulpen", price: 5000 },
];

export function getProducts(req: Request, res: Response) {
  res.status(200).json(products);
}

export function getProductById(req: Request, res: Response) {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }
  res.status(200).json(product);
}

export function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;
  const product = { id: nextId++, name, price };
  products.push(product);
  res.status(201).json(product);
}
