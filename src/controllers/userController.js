const User = require('../models/User');
const Cart = require('../models/Cart');
// Обновление статуса до админа
exports.updateAdmin = async (req, res, next) => {
  const { username, isAdmin } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.adminStatus(user.id, isAdmin);

    res.status(200).json({ message: 'User updated successfully', username, isAdmin });
  } catch (err) {
    next(err);
  }
};

// Получение всех user
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

// Получение одного user
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User retrieved successfully', user });
  } catch (err) {
    next(err);
  }
};

// Удаление user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Cart.deleteAllByUserId(id)
    await User.deleteById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
