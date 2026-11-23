import { Link } from "react-router";
import { FiBox, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import type { Product } from "../../types/product";
import { formatRupiah } from "../../utils/formatRupiah";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge>ID: {product.id}</Badge>
          <span className="rounded-lg bg-slate-50 p-2 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <FiBox className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <p className="mt-1.5 text-xl font-bold text-blue-600">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
          Detail
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
        >
          <FiEdit2 className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(product)}
          aria-label={`Hapus ${product.name}`}
        >
          <FiTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
