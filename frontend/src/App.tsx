import './App.css';
import { initialProducts } from './data/products';
import { formatRupiah } from './utils/formatRupiah';

export default function App() {
  return (
    <main className="page">
      <h1>Manajemen Produk</h1>
      <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
      <ul>
        {initialProducts.map((product) => (
          <li key={product.id}>
            {product.name} ({formatRupiah(product.price)})
          </li>
        ))}
      </ul>
    </main>
  );
}
