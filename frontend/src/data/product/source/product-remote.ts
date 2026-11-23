import type { ProductPayload } from "../../../types/product";
import ProductListParam from "../param/product-list-param";

export type ProductRemoteSource = {
  getProductListRemote: (param?: ProductListParam) => Promise<unknown>;
  getProductByIdRemote: (id: number) => Promise<unknown>;
  createProductRemote: (payload: ProductPayload) => Promise<unknown>;
  updateProductRemote: (id: number, payload: ProductPayload) => Promise<unknown>;
  deleteProductRemote: (id: number) => Promise<void>;
};

type ProductRemoteOptions = {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
};

export default function ProductRemote({
  baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api",
  fetchImpl = fetch,
}: ProductRemoteOptions = {}): ProductRemoteSource {
  function buildUrl(path = ""): URL {
    if (!baseUrl.trim()) {
      throw new Error("Isi VITE_API_BASE_URL di .env.local terlebih dahulu.");
    }
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const url = new URL(`${cleanBase}/products${path}`);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("URL API harus menggunakan http atau https.");
    }
    return url;
  }

  async function extractErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
      const body = (await response.json()) as { message?: string };
      if (body && typeof body.message === "string" && body.message.trim()) {
        return body.message;
      }
    } catch {
      // ignore non-json error body
    }
    return `${fallback} (HTTP ${response.status}).`;
  }

  async function getProductListRemote(param = new ProductListParam()): Promise<unknown> {
    const url = buildUrl();
    url.search = param.toQueryString();

    const response = await fetchImpl(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, "Gagal memuat daftar produk"));
    }

    return response.json();
  }

  async function getProductByIdRemote(id: number): Promise<unknown> {
    const url = buildUrl(`/${id}`);
    const response = await fetchImpl(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) {
      throw new Error("NOT_FOUND");
    }

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, "Gagal memuat detail produk"));
    }

    return response.json();
  }

  async function createProductRemote(payload: ProductPayload): Promise<unknown> {
    const url = buildUrl();
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, "Gagal menambahkan produk"));
    }

    return response.json();
  }

  async function updateProductRemote(id: number, payload: ProductPayload): Promise<unknown> {
    const url = buildUrl(`/${id}`);
    const response = await fetchImpl(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, "Gagal memperbarui produk"));
    }

    return response.json();
  }

  async function deleteProductRemote(id: number): Promise<void> {
    const url = buildUrl(`/${id}`);
    const response = await fetchImpl(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, "Gagal menghapus produk"));
    }
  }

  return {
    getProductListRemote,
    getProductByIdRemote,
    createProductRemote,
    updateProductRemote,
    deleteProductRemote,
  };
}
