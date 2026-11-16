import { useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import { initialProducts } from './data/products';
import type { Product } from './types/product';

export default function App() {
  const [products] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState('');

  const keyword = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword),
  );

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn btn-primary">
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
              onEdit={() => undefined}
              onDelete={() => undefined}
            />
          ))}
        </section>
      )}

      <p className="page-footer">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </main>
  );
}
