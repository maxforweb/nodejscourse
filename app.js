const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const todoController = require('./controller/todo.controller')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/create', (req, res) => {
    todoController.createTodo(req.body).then(data => res.json(data));
});

app.get('/api/', (req, res) => {
    todoController.getTodos().then(data => res.json(data));
});

app.put('/api/update', (req, res) => {
    todoController.updateTodo(req.body).then(data => res.json(data));
});

app.delete('/api/delete', (req, res) => {
    todoController.deleteTodo(req.body._id).then(data => res.json(data));
});

app.put('/api/complete', (req, res) => {
    todoController.updateTodo(req.body).then(data => res.json(data));
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})