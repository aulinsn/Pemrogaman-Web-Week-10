import type { ProductPayload } from "../../../types/product";
import ProductModel from "../model/product-model";
import ProductListParam from "../param/product-list-param";
import ProductRemote, { type ProductRemoteSource } from "../source/product-remote";

function unwrapPayload(raw: unknown): unknown {
  if (typeof raw === "object" && raw !== null && "data" in raw) {
    return (raw as { data: unknown }).data;
  }
  return raw;
}

export default function ProductRepository(
  source: ProductRemoteSource = ProductRemote()
) {
  async function getProductList(param = new ProductListParam()): Promise<ProductModel[]> {
    const raw = await source.getProductListRemote(param);
    const unwrapped = unwrapPayload(raw);

    if (!Array.isArray(unwrapped)) {
      throw new TypeError("Response API daftar produk harus berupa array.");
    }

    const products = unwrapped.map((item) => ProductModel.fromResponse(item));
    const ids = products.map((p) => p.getId());
    if (new Set(ids).size !== ids.length) {
      throw new TypeError("ID produk dari API harus unik.");
    }

    return products;
  }

  async function getProductById(id: number): Promise<ProductModel> {
    const raw = await source.getProductByIdRemote(id);
    const unwrapped = unwrapPayload(raw);
    return ProductModel.fromResponse(unwrapped);
  }

  async function createProduct(payload: ProductPayload): Promise<ProductModel> {
    const raw = await source.createProductRemote(payload);
    const unwrapped = unwrapPayload(raw);
    return ProductModel.fromResponse(unwrapped);
  }

  async function updateProduct(id: number, payload: ProductPayload): Promise<ProductModel> {
    const raw = await source.updateProductRemote(id, payload);
    const unwrapped = unwrapPayload(raw);
    return ProductModel.fromResponse(unwrapped);
  }

  async function deleteProduct(id: number): Promise<void> {
    await source.deleteProductRemote(id);
  }

  return {
    getProductList,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
