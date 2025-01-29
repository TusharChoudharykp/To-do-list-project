const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");
const moment = require("moment-timezone");

// Add Task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, dueDate, id } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const istDueDate = moment(dueDate)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    const list = new List({
      title,
      body,
      dueDate: istDueDate,
      user: existingUser._id,
    });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    return res.status(200).json({ message: "Task Added", list });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, dueDate, email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update task
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task Updated", updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists and remove task from user's list
    const existingUser = await User.findByIdAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete task from List collection
    const deletedTask = await List.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get Tasks
router.get("/getTasks/:id", async (req, res) => {
  try {
    const tasks = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
