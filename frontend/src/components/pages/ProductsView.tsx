import { useCallback, useEffect, useMemo, useState } from "react";
import { FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import ProductRepository from "../../data/product/repository/product-repository";
import type { Product, ProductPayload } from "../../types/product";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import DeleteDialog from "../organisms/DeleteDialog";
import ProductFormModal from "../organisms/ProductFormModal";
import ProductGrid from "../organisms/ProductGrid";

export default function ProductsView() {
  const repository = useMemo(() => ProductRepository(), []);

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const list = await repository.getProductList();
      setProducts(list.map((item) => item.toJSON()));
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memuat produk."
      );
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        String(item.id).includes(keyword)
    );
  }, [products, searchQuery]);

  async function handleCreateSubmit(data: ProductPayload) {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const created = await repository.createProduct(data);
      setProducts((prev) => [...prev, created.toJSON()]);
      setIsCreateOpen(false);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal menambahkan produk."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEditSubmit(data: ProductPayload) {
    if (!editingProduct) return;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const updated = await repository.updateProduct(editingProduct.id, data);
      setProducts((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? updated.toJSON() : item))
      );
      setEditingProduct(null);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal memperbarui produk."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingProduct) return;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await repository.deleteProduct(deletingProduct.id);
      setProducts((prev) => prev.filter((item) => item.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal menghapus produk."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-blue-600">Katalog Inventaris</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Daftar Produk
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola tambah, ubah, detail, dan hapus produk secara langsung melalui REST API.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" onClick={() => void fetchProducts()} disabled={isLoading}>
            <FiRefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Muat Ulang
          </Button>
          <Button variant="primary" onClick={() => setIsCreateOpen(true)}>
            <FiPlus className="h-4 w-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Toolbar Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Cari nama atau ID produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Cari produk"
          />
        </div>
        <p className="text-sm text-slate-500">
          Menampilkan <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{" "}
          dari {products.length} produk
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          role="alert"
        >
          <p className="font-semibold">Terjadi Kesalahan</p>
          <p className="mt-0.5">{errorMessage}</p>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-5 w-16 rounded bg-slate-200" />
              <div className="mt-4 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mt-2 h-7 w-1/2 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={(product) => setDeletingProduct(product)}
        />
      )}

      {/* Modals */}
      {isCreateOpen && (
        <ProductFormModal
          isSubmitting={isSubmitting}
          onSubmit={handleCreateSubmit}
          onClose={() => setIsCreateOpen(false)}
        />
      )}

      {editingProduct && (
        <ProductFormModal
          product={editingProduct}
          isSubmitting={isSubmitting}
          onSubmit={handleEditSubmit}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteDialog
          product={deletingProduct}
          isDeleting={isSubmitting}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}
