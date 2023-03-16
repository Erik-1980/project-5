const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Получение списка всех продуктов
router.get('/', productController.getAllProducts);

// Получение информации о конкретном продукте
router.get('/:id', productController.getProductById);

// Создание нового продукта (админ)
router.post('/', adminMiddleware, productController.createProduct);

// Обновление информации о продукте (админ)
router.put('/:id', adminMiddleware, productController.updateProduct);

// Удаление продукта (админ)
router.delete('/:id', adminMiddleware, productController.deleteProduct);

module.exports = router;