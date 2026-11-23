import { FiPackage } from "react-icons/fi";
import type { Product } from "../../types/product";
import ProductCard from "../molecules/ProductCard";

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <div className="rounded-full bg-slate-100 p-3 text-slate-400">
          <FiPackage className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-900">Tidak ada produk</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Belum ada produk yang cocok dengan pencarian Anda atau data produk masih kosong.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
