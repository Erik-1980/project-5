const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Обновление информации админа (админ)
router.put('/admin', adminMiddleware, userController.updateAdmin);

// Получение списка всех пользователей (админ)
router.get('/', adminMiddleware, userController.getAllUsers);

// Получение информации о пользователе (админ и user)
router.get('/:id', authMiddleware, userController.getUserById);

// Удаление пользователя (админ и user)
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;