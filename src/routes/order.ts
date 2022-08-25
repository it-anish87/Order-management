import { Router } from "express";
import OrderController from "../controllers/orderController";

const router = Router();

router.get("/orders", OrderController.getOrders);
router.post("/orders", OrderController.create);

export default router;