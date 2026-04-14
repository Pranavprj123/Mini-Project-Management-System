const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create Task
router.post("/projects/:project_id/tasks", async (req, res) => {
  const task = new Task({
    ...req.body,
    project_id: req.params.project_id
  });

  await task.save();
  res.json(task);
});

// Get Tasks with Filtering & Sorting
router.get("/projects/:project_id/tasks", async (req, res) => {
  const { status, sort } = req.query;

  let filter = { project_id: req.params.project_id };
  if (status) filter.status = status;

  let query = Task.find(filter);

  if (sort === "due_date") {
    query = query.sort({ due_date: 1 });
  }

  const tasks = await query;
  res.json(tasks);
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;