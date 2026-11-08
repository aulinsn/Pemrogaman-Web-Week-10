import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/", updateProduct); // id dikirim di body
router.put("/:id", updateProduct); // id dikirim di path
router.delete("/:id", deleteProduct);

export default router;
