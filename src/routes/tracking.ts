import { Router } from "express";
import TrackingController from "../controllers/trackingController";

const router = Router();

router.get("/order-status", TrackingController.trackOrder);

export default router;