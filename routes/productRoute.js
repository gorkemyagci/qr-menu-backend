const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.route('/').get(productController.getProducts);
router.route('/').post(roleMiddleware(['admin']), productController.createProduct);
router.route('/:id').get(productController.getProduct);
router.route('/:id').put(roleMiddleware(['admin']), productController.updateProduct);
router.route('/:id').delete(roleMiddleware(['admin']), productController.deleteProduct);

module.exports = router;