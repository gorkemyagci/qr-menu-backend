const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.route('/').get(categoryController.getCategories);
router.route('/').post(roleMiddleware(['admin']),categoryController.createCategory);
router.route('/:id').get(categoryController.getCategory);
router.route('/:id').put(roleMiddleware(['admin']),categoryController.updateCategory);
router.route('/:id').delete(roleMiddleware(['admin']),categoryController.deleteCategory);

module.exports = router;