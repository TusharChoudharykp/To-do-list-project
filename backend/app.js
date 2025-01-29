const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connections/connection");
const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);

connectToMongoDB("mongodb://127.0.0.1:27017/todo-list")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
