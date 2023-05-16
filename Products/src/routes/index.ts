import express from 'express';
import controller from '../controllers';
const router = express.Router();

router.post('/createProduct', controller.createProduct);
// router.get('/fetchProductById', controller.fetchProductById);
router.get('/fetchAllProducts', controller.fetchAllProducts);
router.patch('/updateProductById/:id', controller.updateProductById);
router.delete('/deleteAllProducts', controller.deleteAllProducts);
router.delete('/deleteProductById', controller.deleteProductById);

export default router;
