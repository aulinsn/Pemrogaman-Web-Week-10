import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FiAlertCircle, FiArrowLeft, FiBox, FiEdit2, FiTrash2 } from "react-icons/fi";
import ProductRepository from "../../data/product/repository/product-repository";
import type { Product, ProductPayload } from "../../types/product";
import { formatRupiah } from "../../utils/formatRupiah";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import DeleteDialog from "../organisms/DeleteDialog";
import ProductFormModal from "../organisms/ProductFormModal";

export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const repository = useMemo(() => ProductRepository(), []);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchDetail() {
      const numericId = Number(id);
      if (!id || !Number.isSafeInteger(numericId) || numericId <= 0) {
        setIsNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsNotFound(false);
        setErrorMessage(null);
        const found = await repository.getProductById(numericId);
        if (active) {
          setProduct(found.toJSON());
        }
      } catch (err) {
        if (!active) return;
        if (err instanceof Error && err.message === "NOT_FOUND") {
          setIsNotFound(true);
        } else {
          setErrorMessage(
            err instanceof Error ? err.message : "Gagal memuat detail produk."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void fetchDetail();
    return () => {
      active = false;
    };
  }, [id, repository]);

  async function handleEditSubmit(data: ProductPayload) {
    if (!product) return;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const updated = await repository.updateProduct(product.id, data);
      setProduct(updated.toJSON());
      setIsEditOpen(false);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal memperbarui produk."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!product) return;
    try {
      setIsSubmitting(true);
      await repository.deleteProduct(product.id);
      navigate("/products", { replace: true });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal menghapus produk."
      );
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white p-6" />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <FiAlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">Produk Tidak Ditemukan</h2>
        <p className="mt-2 text-sm text-slate-500">
          Produk dengan ID <span className="font-semibold text-slate-800">{id}</span> tidak
          tersedia atau telah dihapus dari database.
        </p>
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  if (errorMessage || !product) {
    return (
      <div className="space-y-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <FiArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Produk
        </Link>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {errorMessage ?? "Data produk tidak dapat ditampilkan."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Produk
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiBox className="h-6 w-6" />
            </div>
            <div>
              <Badge variant="primary">ID Produk: #{product.id}</Badge>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-2 text-2xl font-extrabold text-blue-600">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="outline" onClick={() => setIsEditOpen(true)}>
              <FiEdit2 className="h-4 w-4" />
              Edit Produk
            </Button>
            <Button variant="outline-danger" onClick={() => setIsDeleteOpen(true)}>
              <FiTrash2 className="h-4 w-4" />
              Hapus
            </Button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
              ID Database
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{product.id}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Harga Satuan
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">
              {formatRupiah(product.price)}
            </dd>
          </div>
          {product.createdAt && (
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Dibuat Pada
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {new Date(product.createdAt).toLocaleString("id-ID")}
              </dd>
            </div>
          )}
          {product.updatedAt && (
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Terakhir Diperbarui
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {new Date(product.updatedAt).toLocaleString("id-ID")}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {isEditOpen && (
        <ProductFormModal
          product={product}
          isSubmitting={isSubmitting}
          onSubmit={handleEditSubmit}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {isDeleteOpen && (
        <DeleteDialog
          product={product}
          isDeleting={isSubmitting}
          onConfirm={handleDeleteConfirm}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
}
