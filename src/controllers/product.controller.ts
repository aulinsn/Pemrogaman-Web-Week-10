import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });
  res.status(200).json(products);
}

export async function getProductById(req: Request, res: Response) {
  const product = await prisma.product.findUnique({
    where: { id: res.locals.productId },
  });
  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }
  res.status(200).json(product);
}

export async function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;
  const product = await prisma.product.create({
    data: { name, price },
  });
  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const { name, price } = req.body;
  const id: number = res.locals.productId;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  const product = await prisma.product.update({
    where: { id },
    data: { name, price },
  });
  res.status(200).json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const id: number = res.locals.productId;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  await prisma.product.delete({ where: { id } });
  res.status(200).json({ message: "Produk berhasil dihapus", data: existing });
}
