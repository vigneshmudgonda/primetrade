const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Tasks (Admin) / Own Tasks (User)
const getTasks = async (req, res) => {
  try {
    const tasks = req.user.role === "admin"
      ? await Task.find().populate("owner", "name email")
      : await Task.find({ owner: req.user._id });

    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(task, req.body);
    await task.save();

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
