import { Router } from "express";
import OrderItemController from "../controllers/orderItemController";

const router = Router();

router.get("/orderItem", OrderItemController.getAllOrderItems);
router.post("/create-orderItem", OrderItemController.create);

export default router;