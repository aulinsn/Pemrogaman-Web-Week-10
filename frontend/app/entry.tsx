import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./globals.css";
import AppRoutes from "./routes";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element tidak ditemukan.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
