import { Link } from "react-router";
import { FiArrowLeft, FiCompass, FiPackage } from "react-icons/fi";

export default function NotFoundView() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <FiCompass className="h-8 w-8" />
      </div>
      <p className="mt-4 text-sm font-bold uppercase tracking-widest text-blue-600">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        Maaf, URL yang Anda tuju tidak terdaftar atau halaman telah dipindahkan.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" />
          Ke Dashboard
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <FiPackage className="h-4 w-4" />
          Lihat Daftar Produk
        </Link>
      </div>
    </div>
  );
}
