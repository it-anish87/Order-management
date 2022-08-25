import { Router } from "express";
import customerRoutes from "./customer";
import orderRoutes from "./order";
import orderItemRoutes from "./orderItem";
import productRoutes from "./product";
import trackingRoutes from "./tracking"

const router = Router();

//Register the routers
router.use(customerRoutes);
router.use(orderRoutes);
router.use(orderItemRoutes);
router.use(productRoutes);
router.use(trackingRoutes);

export default router;