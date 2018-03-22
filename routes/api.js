const express = require('express');
const fs = require('fs');
const format = require('date-fns/format');
const router = express.Router();

let todos = [];

fs.readFile('./todos.json', 'utf8', (err, data) => {
  if (err) throw err;
  todos = JSON.parse(data).todos;
});

router.get('/todos', (req, res) => res.json(todos));

router.get('/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id == req.params.id);
  res.json(todo);
});

router.post('/todos', (req, res) => {
  const id = todos[todos.length - 1].id + 1;
  const todo = {
    id: id,
    title: req.body.title,
    completed: false,
    date: format(new Date, 'YYYY-MM-DD')
  }
  todos.push(todo);
  res.json(todo);
});

router.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id == id);
  todos[index] = req.body;
  res.json(todos[index]);
});

router.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find(todo => todo.id == id);
  todos = todos.filter(todo => todo.id != id);
  res.json(todo);
});

module.exports = router;