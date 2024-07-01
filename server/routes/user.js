import express from "express";
import { login, register, deleteUser } from "../controllers/user.js ";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

// server.js (Node.js/Express example)

router.get("/auth/check-auth", (req, res) => {
  const token = req.cookies.access_token; // assuming the token is stored in a cookie named 'jwt'
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid" });
    }
    res.json(user);
  });
});

export default router;
