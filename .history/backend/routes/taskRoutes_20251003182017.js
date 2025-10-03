const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: Create a task. Normal users can create tasks for themselves; admins can create tasks for any user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish Project
 *               description:
 *                 type: string
 *                 example: Complete the backend and frontend integration
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", auth, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: Get tasks. Normal users see only their own tasks; admins see all tasks.
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
router.get("/", auth, getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: Update a task by ID. Users can update only their own tasks; admins can update any task.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task Title
 *               description:
 *                 type: string
 *                 example: Updated task description
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.put("/:id", auth, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a task by ID. Users can delete only their own tasks; admins can delete any task.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete("/:id", auth, deleteTask);

module.exports = router;
