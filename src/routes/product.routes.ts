import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  validateId,
  validateProductBody,
} from "../middleware/validate-product.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProductBody, createProduct);
router.put("/", validateId, validateProductBody, updateProduct); // id di body
router.put("/:id", validateId, validateProductBody, updateProduct); // id di path
router.delete("/:id", validateId, deleteProduct);

export default router;
