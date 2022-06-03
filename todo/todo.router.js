const express = require('express')
const todoRouters = express.Router()

const {
  getAllTodos,
  getTodoById,
  addNewTodo,
  updateTodo,
  removeTodo,
  updateCompleteTodo,
  validateNewTodo
} = require('./todo.controller')

todoRouters.get('/', getAllTodos)
todoRouters.get('/:id', getTodoById)
todoRouters.post('/create', validateNewTodo, addNewTodo)
todoRouters.delete('/delete/:id', removeTodo)
todoRouters.patch('/update/:id', validateNewTodo, updateTodo)
todoRouters.patch('/complete/:id', updateCompleteTodo)

module.exports = todoRouters
