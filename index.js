const cors = require("cors");
const express = require("express");
const Task = require("./models/task");
require("dotenv").config();
require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await Task.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Task({
    task: req.body.text,
  });
  todo.save();
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/completed/:id", async (req, res) => {
  const todo = await Task.findById(req.params.id);
  todo.completed = !todo.completed;
  todo.save();
  res.json(todo);
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
