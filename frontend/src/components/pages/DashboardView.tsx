import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { FiArrowRight, FiBox, FiDollarSign, FiPackage, FiPlus } from "react-icons/fi";
import ProductRepository from "../../data/product/repository/product-repository";
import type { Product } from "../../types/product";
import { formatRupiah } from "../../utils/formatRupiah";

export default function DashboardView() {
  const repository = useMemo(() => ProductRepository(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadSummary() {
      try {
        setIsLoading(true);
        setError(null);
        const list = await repository.getProductList();
        if (active) {
          setProducts(list.map((m) => m.toJSON()));
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Gagal memuat ringkasan data.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }
    void loadSummary();
    return () => {
      active = false;
    };
  }, [repository]);

  const totalProducts = products.length;
  const totalAssetValue = products.reduce((sum, item) => sum + item.price, 0);
  const highestPriceProduct = products.reduce<Product | null>(
    (max, item) => (!max || item.price > max.price ? item : max),
    null
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">Ringkasan Aplikasi</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard Produk
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pantau statistik inventaris produk yang terhubung langsung dengan backend API.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="h-4 w-4" />
          Kelola Produk
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <p className="font-semibold">Gagal terhubung ke backend</p>
          <p className="mt-0.5">{error}</p>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Produk</span>
            <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <FiPackage className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {isLoading ? "..." : `${totalProducts} Item`}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Nilai Harga</span>
            <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <FiDollarSign className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {isLoading ? "..." : formatRupiah(totalAssetValue)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Produk Termahal</span>
            <span className="rounded-lg bg-amber-50 p-2 text-amber-600">
              <FiBox className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 truncate text-lg font-bold text-slate-900">
            {isLoading
              ? "..."
              : highestPriceProduct
                ? highestPriceProduct.name
                : "Belum ada data"}
          </p>
          {!isLoading && highestPriceProduct && (
            <p className="mt-0.5 text-xs font-medium text-blue-600">
              {formatRupiah(highestPriceProduct.price)}
            </p>
          )}
        </div>
      </div>

      {/* Quick Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Produk Terbaru</h3>
            <p className="text-xs text-slate-500">
              Klik salah satu produk untuk membuka halaman detail (/products/:id).
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat semua
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-slate-500">Memuat data dari API...</p>
        ) : products.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            Belum ada produk tersimpan di database.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {products.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center justify-between py-3 hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">ID: {product.id}</p>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {formatRupiah(product.price)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
