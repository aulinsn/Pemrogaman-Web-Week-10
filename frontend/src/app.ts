import express from "express";
import cors from "cors";
import { requestLogger } from "../../src/middleware/request-logger.js";
import { errorHandler } from "../../src/middleware/error-handler.js";
import productRouter from "../../src/routes/product.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);
app.use(express.json());
app.use(requestLogger);

app.use("/products", productRouter);
app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
});

app.use(errorHandler);

export default app;
