import express from 'express';

import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    createProductReview,
    updateProduct,
    getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/')
    .post(protect, admin, createProduct)
    .get(getProducts);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;