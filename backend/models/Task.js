const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  due_date: Date,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);