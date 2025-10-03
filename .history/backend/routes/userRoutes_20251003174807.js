import express from "express";
 User from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Add new user
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.json({ message: "User added", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "Failed to add user" });
  }
});

// Update user role
router.patch("/:id", async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(400).json({ message: "Failed to update user" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete user" });
  }
});

export default router;
