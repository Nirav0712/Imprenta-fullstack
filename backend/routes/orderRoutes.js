import express from "express";
import { getOrders, getOrderById, updateOrderStatus, createOrder } from "../controllers/orderController.js";
import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getOrders);
router.get("/:id", protect, adminOnly, getOrderById);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.post("/", optionalAuth, createOrder);

import { getMyOrders } from "../controllers/orderController.js";
router.get("/myorders", protect, getMyOrders);

export default router;
