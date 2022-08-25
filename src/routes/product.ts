import { Router } from "express";
import ProductController from "../controllers/productController";

const router = Router();

router.get("/getproduct", ProductController.getAllProducts);
router.post("/products", ProductController.create);

export default router;