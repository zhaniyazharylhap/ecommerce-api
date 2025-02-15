const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Нет доступа (нет токена)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

const adminMiddleware = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "Нет доступа" });
  }

  const user = await User.findById(req.user.id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Требуются права администратора" });
  }

  next();
};

module.exports = { authMiddleware, adminMiddleware };
