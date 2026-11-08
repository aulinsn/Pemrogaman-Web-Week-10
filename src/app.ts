import express from "express";
import { requestLogger } from "./middleware/request-logger.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
});

export default app;
