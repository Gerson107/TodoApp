const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
    
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = mongoose.model('Tasks', TaskSchema)
module.exports = task