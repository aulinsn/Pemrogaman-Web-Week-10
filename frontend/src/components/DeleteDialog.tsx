import type { Product } from '../types/product';
import { formatRupiah } from '../utils/formatRupiah';
import './DeleteDialog.css';
import Modal from './Modal';

interface DeleteDialogProps {
  product: Product;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteDialog({ product, onConfirm, onClose }: DeleteDialogProps) {
  return (
    <Modal labelId="delete-dialog-title" onClose={onClose}>
      <div className="delete-dialog">
        <span className="delete-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </span>
        <h2 id="delete-dialog-title">Hapus Produk?</h2>
        <p className="modal-description">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="delete-product">
          <span className="delete-product-id">ID: {product.id}</span>
          <span className="delete-product-name">{product.name}</span>
          <span className="delete-product-price">{formatRupiah(product.price)}</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Hapus Produk
          </button>
        </div>
      </div>
    </Modal>
  );
}
