import express from "express";
import {
  login,
  register,
  userDetails,
  deleteUser,
} from "../controllers/user.js ";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

//Authenticate User
router.get("/auth/check-auth", (req, res) => {
  const token = req.cookies.access_token;
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

// Route to get the username
router.get("/view", userDetails, async (req, res) => {
  try {
    const userName = req.username; // Retrieve the userName from the request object
    res.status(200).json({ userName }); // Send it back as a JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
