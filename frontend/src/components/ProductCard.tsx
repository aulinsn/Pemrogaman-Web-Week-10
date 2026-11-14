import type { Product } from '../types/product';
import { formatRupiah } from '../utils/formatRupiah';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formatRupiah(product.price)}</p>
      <div className="product-actions">
        <button type="button" className="btn btn-outline" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={() => onDelete(product)}>
          Hapus
        </button>
      </div>
    </article>
  );
}
