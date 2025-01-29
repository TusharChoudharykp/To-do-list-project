const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};

// const moongoose = require("mongoose");

// const connection = async (req, res) => {
//     await moongoose.connect("mongodb://127.0.0.1:27017/todo-list")
// };
