import './App.css';
import ProductCard from './components/ProductCard';
import { initialProducts } from './data/products';

export default function App() {
  return (
    <main className="page">
      <h1>Manajemen Produk</h1>
      <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
      <section className="product-grid">
        {initialProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => undefined}
            onDelete={() => undefined}
          />
        ))}
      </section>
    </main>
  );
}
