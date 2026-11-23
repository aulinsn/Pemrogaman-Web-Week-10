import { FiTrash2 } from "react-icons/fi";
import type { Product } from "../../types/product";
import { formatRupiah } from "../../utils/formatRupiah";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";

interface DeleteDialogProps {
  product: Product;
  isDeleting?: boolean;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
}

export default function DeleteDialog({
  product,
  isDeleting = false,
  onConfirm,
  onClose,
}: DeleteDialogProps) {
  return (
    <Modal labelId="delete-dialog-title" onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <FiTrash2 className="h-5 w-5" aria-hidden="true" />
        </div>

        <h2 id="delete-dialog-title" className="mt-4 text-lg font-bold text-slate-900">
          Hapus Produk?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Produk yang dihapus dari server tidak dapat dikembalikan.
        </p>

        <div className="mt-4 flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Badge>ID: {product.id}</Badge>
          <span className="mt-1 font-semibold text-slate-900">{product.name}</span>
          <span className="text-sm font-bold text-blue-600">
            {formatRupiah(product.price)}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <Button variant="outline" onClick={onClose} disabled={isDeleting} className="flex-1">
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? "Menghapus..." : "Hapus Produk"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
