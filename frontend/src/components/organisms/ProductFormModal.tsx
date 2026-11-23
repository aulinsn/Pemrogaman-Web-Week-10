import { useState } from "react";
import type { FormEvent } from "react";
import type { Product, ProductPayload } from "../../types/product";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Modal from "../molecules/Modal";

interface FormErrors {
  name?: string;
  price?: string;
}

interface ProductFormModalProps {
  product?: Product;
  isSubmitting?: boolean;
  onSubmit: (data: ProductPayload) => Promise<void> | void;
  onClose: () => void;
}

function validate(name: string, price: string): FormErrors {
  const errors: FormErrors = {};
  const value = Number(price);

  if (name.trim() === "") {
    errors.name = "Nama produk wajib diisi.";
  }
  if (price.trim() === "" || !Number.isFinite(value) || value <= 0) {
    errors.price = "Harga harus lebih dari 0.";
  } else if (!Number.isInteger(value)) {
    errors.price = "Harga harus berupa bilangan bulat.";
  }
  return errors;
}

export default function ProductFormModal({
  product,
  isSubmitting = false,
  onSubmit,
  onClose,
}: ProductFormModalProps) {
  const isEdit = product !== undefined;
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(name, price);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }
    await onSubmit({ name: name.trim(), price: Number(price) });
  }

  return (
    <Modal labelId="product-form-title" onClose={onClose}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="product-form-title" className="text-lg font-bold text-slate-900">
            {isEdit ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isEdit
              ? "Perbarui informasi produk yang dipilih."
              : "Masukkan informasi produk baru ke database."}
          </p>
        </div>
        {product && <Badge variant="primary">ID: {product.id}</Badge>}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div>
          <label
            className="mb-1.5 block text-sm font-medium text-slate-700"
            htmlFor="product-name"
          >
            Nama Produk
          </label>
          <Input
            id="product-name"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            hasError={Boolean(errors.name)}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
            disabled={isSubmitting}
            autoFocus
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-1.5 block text-sm font-medium text-slate-700"
            htmlFor="product-price"
          >
            Harga (Rp)
          </label>
          <Input
            id="product-price"
            type="number"
            min="1"
            placeholder="Contoh: 5000"
            value={price}
            hasError={Boolean(errors.price)}
            onChange={(event) => setPrice(event.target.value)}
            aria-invalid={errors.price ? "true" : "false"}
            disabled={isSubmitting}
          />
          <p
            className={`mt-1.5 text-xs ${
              errors.price ? "font-medium text-rose-600" : "text-slate-500"
            }`}
            role={errors.price ? "alert" : undefined}
          >
            {errors.price ?? "Harga harus berupa bilangan bulat lebih dari 0."}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan Produk"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
