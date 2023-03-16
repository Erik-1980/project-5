const User  = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Регистрация
exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  const users = await User.findByUsername(username);
  if(users != undefined && username===users.username){
    return res.status(401).json({ message: 'User with this name is already registered'});
  }
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  try {
    const user = new User(username, hashedPassword);
    const userId = await user.save();
    res.status(201).json({ message: 'User created successfully!', user: { id: userId, username } });
  } catch (error) {
    next(error);
  }
};

// Аутентификация
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user.id, user.username, user.isAdmin);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Генерация JWT токена
function generateToken(userId, username, isAdmin) {
  const secret = JWT_SECRET;
  const token = jwt.sign({ userId, username, isAdmin }, secret, { expiresIn: '1h' });
  return token;
}