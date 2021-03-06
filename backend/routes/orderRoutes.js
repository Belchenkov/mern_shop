import express from 'express';

import { protect, admin } from "../middleware/authMiddleware.js";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
} from "../controllers/orderController.js";

const router = express.Router();

router.route('/')
    .get(protect, admin, getOrders)
    .post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

export default router;