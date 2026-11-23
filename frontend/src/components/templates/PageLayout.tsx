import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FiBox, FiHome, FiMenu, FiPackage, FiX } from "react-icons/fi";

export default function PageLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white shadow-xs"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <FiBox className="h-4 w-4" />
          </div>
          <span className="font-bold text-slate-900">Inventaris App</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <FiBox className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Pemrograman Web
                </p>
                <h1 className="text-base font-bold text-slate-900">Manajemen Produk</h1>
              </div>
            </div>

            <nav className="mt-8 space-y-1.5" aria-label="Navigasi Utama">
              <NavLink
                to="/"
                end
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FiHome className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/products"
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FiPackage className="h-4 w-4" />
                Daftar Produk
              </NavLink>
            </nav>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Tugas 4 — React Router</p>
            <p className="mt-0.5">Tailwind CSS &amp; Integrasi Backend API</p>
          </div>
        </div>
      </aside>

      {/* Main Content via Outlet */}
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
