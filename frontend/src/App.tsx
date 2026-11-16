import { useRef, useState } from 'react';
import './App.css';
import DeleteDialog from './components/DeleteDialog';
import ProductCard from './components/ProductCard';
import ProductFormModal from './components/ProductFormModal';
import type { ProductFormData } from './components/ProductFormModal';
import { initialProducts } from './data/products';
import type { Product } from './types/product';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const nextId = useRef(Math.max(...initialProducts.map((product) => product.id)) + 1);

  const keyword = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword),
  );

  function addProduct(data: ProductFormData) {
    const id = nextId.current++;
    setProducts((current) => [...current, { id, ...data }]);
    setIsAddOpen(false);
  }

  function updateProduct(data: ProductFormData) {
    if (!editingProduct) {
      return;
    }
    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id ? { ...product, ...data } : product,
      ),
    );
    setEditingProduct(null);
  }

  function removeProduct() {
    if (!deletingProduct) {
      return;
    }
    setProducts((current) => current.filter((product) => product.id !== deletingProduct.id));
    setDeletingProduct(null);
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
          + Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Cari nama produk..."
          aria-label="Cari nama produk"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="product-count">{filteredProducts.length} produk</span>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">Produk tidak ditemukan.</p>
      ) : (
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditingProduct}
              onDelete={setDeletingProduct}
            />
          ))}
        </section>
      )}

      <p className="page-footer">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {isAddOpen && <ProductFormModal onSubmit={addProduct} onClose={() => setIsAddOpen(false)} />}

      {editingProduct && (
        <ProductFormModal
          key={editingProduct.id}
          product={editingProduct}
          onSubmit={updateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteDialog
          product={deletingProduct}
          onConfirm={removeProduct}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </main>
  );
}
