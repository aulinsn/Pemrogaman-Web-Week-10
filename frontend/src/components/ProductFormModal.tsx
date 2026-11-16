import { useState } from 'react';
import type { FormEvent } from 'react';
import Modal from './Modal';

export interface ProductFormData {
  name: string;
  price: number;
}

interface FormErrors {
  name?: string;
  price?: string;
}

interface ProductFormModalProps {
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
}

function validate(name: string, price: string): FormErrors {
  const errors: FormErrors = {};
  const value = Number(price);

  if (name.trim() === '') {
    errors.name = 'Nama produk wajib diisi.';
  }
  if (price.trim() === '' || !Number.isFinite(value) || value <= 0) {
    errors.price = 'Harga harus lebih dari 0.';
  } else if (!Number.isInteger(value)) {
    errors.price = 'Harga harus berupa bilangan bulat.';
  }
  return errors;
}

export default function ProductFormModal({ onSubmit, onClose }: ProductFormModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(name, price);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }
    onSubmit({ name: name.trim(), price: Number(price) });
  }

  return (
    <Modal labelId="product-form-title" onClose={onClose}>
      <h2 id="product-form-title">Tambah Produk</h2>
      <p className="modal-description">Masukkan informasi produk baru.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label className="form-label" htmlFor="product-name">
          Nama Produk
        </label>
        <input
          id="product-name"
          className="form-input"
          type="text"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? 'true' : 'false'}
          autoFocus
        />
        {errors.name && (
          <p className="field-error" role="alert">
            {errors.name}
          </p>
        )}

        <label className="form-label" htmlFor="product-price">
          Harga (Rp)
        </label>
        <input
          id="product-price"
          className="form-input"
          type="number"
          min="1"
          placeholder="Contoh: 5000"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-invalid={errors.price ? 'true' : 'false'}
        />
        <p className={errors.price ? 'field-error' : 'field-hint'} role={errors.price ? 'alert' : undefined}>
          {errors.price ?? 'Harga harus lebih dari 0.'}
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Produk
          </button>
        </div>
      </form>
    </Modal>
  );
}
