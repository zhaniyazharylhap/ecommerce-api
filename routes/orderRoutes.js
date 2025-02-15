const express = require("express");
const Order = require("../models/Order"); 
const Product = require("../models/Product");
const { authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;

    const validProducts = await Product.find({ _id: { $in: products } });

    if (validProducts.length !== products.length) {
      return res.status(400).json({ message: "Некоторые товары не найдены" });
    }

    const order = new Order({
      user: userId,
      products,
    });

    await order.save();
    res.status(201).json({ message: "Заказ создан", order });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании заказа", error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("products");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
});

module.exports = router;
