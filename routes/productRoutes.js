const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

console.log("✅ authMiddleware:", authMiddleware);
console.log("✅ adminMiddleware:", adminMiddleware);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("📌 GET /api/products - Получение всех товаров");
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Ошибка при получении товаров:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log("📌 POST /api/products - Добавление товара");
    console.log("📌 Тело запроса:", req.body);

    const { name, price, description, category, stock } = req.body;
    if (!name || !price || !description || !category || stock === undefined) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const newProduct = new Product({ name, price, description, category, stock });
    await newProduct.save();
    console.log("✅ Товар успешно добавлен:", newProduct);
    res.status(201).json({ message: "Товар добавлен", product: newProduct });
  } catch (error) {
    console.error("❌ Ошибка при добавлении товара:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log(`📌 PUT /api/products/${req.params.id} - Обновление товара`);
    console.log("📌 Тело запроса:", req.body);

    const { name, price, description, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    console.log("✅ Товар успешно обновлен:", updatedProduct);
    res.status(200).json({ message: "Товар обновлён", product: updatedProduct });
  } catch (error) {
    console.error("❌ Ошибка при обновлении товара:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log(`📌 DELETE /api/products/${req.params.id} - Удаление товара`);
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    console.log("✅ Товар успешно удалён:", deletedProduct);
    res.status(200).json({ message: "Товар удалён" });
  } catch (error) {
    console.error("❌ Ошибка при удалении товара:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
