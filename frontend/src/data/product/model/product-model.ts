import type { Product } from "../../../types/product";

export default class ProductModel {
  private readonly id: number;
  private readonly name: string;
  private readonly price: number;
  private readonly createdAt?: string;
  private readonly updatedAt?: string;

  constructor({ id, name, price, createdAt, updatedAt }: Product) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getCreatedAt(): string | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): string | undefined {
    return this.updatedAt;
  }

  toJSON(): Product {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      ...(this.createdAt ? { createdAt: this.createdAt } : {}),
      ...(this.updatedAt ? { updatedAt: this.updatedAt } : {}),
    };
  }

  static fromResponse(data: unknown): ProductModel {
    if (typeof data !== "object" || data === null) {
      throw new TypeError("Format produk dari API tidak valid.");
    }
    const record = data as Record<string, unknown>;
    if (
      typeof record.id !== "number" ||
      !Number.isSafeInteger(record.id) ||
      record.id <= 0 ||
      typeof record.name !== "string" ||
      !record.name.trim() ||
      typeof record.price !== "number" ||
      !Number.isFinite(record.price) ||
      !Number.isInteger(record.price) ||
      record.price <= 0
    ) {
      throw new TypeError("Format produk dari API tidak valid.");
    }
    return new ProductModel({
      id: record.id,
      name: record.name.trim(),
      price: record.price,
      createdAt: typeof record.createdAt === "string" ? record.createdAt : undefined,
      updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : undefined,
    });
  }
}
