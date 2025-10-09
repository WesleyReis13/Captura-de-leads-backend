const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../services/userService");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-secreto";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

module.exports = router;