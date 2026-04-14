const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ IMPORT ROUTES HERE
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors());

// ✅ CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/projectDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ USE ROUTES HERE (VERY IMPORTANT)
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);

// ✅ SERVER START
app.listen(5000, () => console.log("Server running on port 5000"));