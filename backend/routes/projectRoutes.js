const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create Project
router.post("/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// Get Projects with Pagination
router.get("/projects", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const projects = await Project.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(projects);
});

// Get Single Project
router.get("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

// Delete Project
router.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;