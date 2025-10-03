const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Admin-only endpoint. Returns all users in the system.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 650a1f2e7c9f0b1234567890
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       role:
 *                         type: string
 *                         example: user
 *       500:
 *         description: Failed to fetch users
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Admin-only endpoint. Create a new user with name, email, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *     responses:
 *       201:
 *         description: User added successfully
 *       400:
 *         description: Failed to add user
 */
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

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user's role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Admin-only endpoint. Update role of a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Failed to update user
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Admin-only endpoint. Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Failed to delete user
 */
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
