const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const newProduct = new Product({ name, price, description, category, stock });
    await newProduct.save();
    res.status(201).json({ message: "Товар создан", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании товара", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении товаров", error: error.message });
  }
};
