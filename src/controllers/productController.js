const Product = require('../models/Product');

// Создание нового продукта
exports.createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  
  try {
    const product = new Product(name, price, image);
    const productId = await product.save();
    res.status(201).json({ message: 'Product created successfully!', product: { id: productId, name } });
  } catch (error) {
    next(error);
  }
};

// Получение информации о продукте
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (err) {
    next(err);
  }
};

// Получение списка всех продуктов
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProduct();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

// Обновление продукта по id
exports.updateProduct = async (req, res) => {
  const { name, price, image } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.updateById(id, name, price, image);
    res.status(200).json({ message: 'Product updated successfully', id, name, price, image });
  } catch (err) {
    next(err);
  }
};

// Удаление продукта по id
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteById(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};