const Joi = require('joi')
const todoModel = require('./todo.model')
const {
  Types: { ObjectId }
} = require('mongoose')

const todoSchema = Joi.object({
  label: Joi.string().required(),
  done: Joi.boolean().required()
})

async function getAllTodos(req, res) {
  try {
    const todos = await todoModel.find()
    return res.status('200').json(todos)
  } catch (error) {
    return res
      .status(400)
      .send(
        'Sorry! Can`t get todos from data base right now! Try again later...'
      )
  }
}

async function getTodoById(req, res) {
  try {
    const todo = await todoModel.findById(req.params.id)
    if (!todo)
      return res
        .status(404)
        .json({ message: `Todo with id ${req.params.id} not found` })

    return res.status(200).send(todo)
  } catch (error) {
    res
      .status(400)
      .send('Sorry! Can`t get todo from data base right now! Try another one')
  }
}

async function addNewTodo(req, res) {
  try {
    const newTodo = await todoModel.create(req.body)

    return res.status(201).json(newTodo)
  } catch (error) {
    res
      .status(400)
      .send('Sorry! Can`t create new todo right now! Try again later')
  }
}

async function updateTodo(req, res) {
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    if (!updatedTodo)
      return res
        .status(404)
        .json({ message: `Todo with id ${req.params.id} not found` })

    return res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(400).send('Sorry! Can`t update todo right now! Try again later')
  }
}

async function removeTodo(req, res) {
  try {
    const todoToDelete = await todoModel.findByIdAndRemove(req.params.id)

    if (!todoToDelete)
      return res
        .status(400)
        .json({ message: `Todo with id ${req.params.id} not found` })

    return res
      .status(200)
      .json({ message: `Todo with id ${req.params.id} deleted` })
  } catch (error) {
    res.status(400).send('Sorry! Can`t delete todo right now! Try again later')
  }
}

async function updateCompleteTodo(req, res) {
  try {
    const updatedTodo = await todoModel.updateOne(req.params.id, {
      $set: req.body.done
    })

    if (!updatedTodo)
      return res
        .status(404)
        .json({ message: `Todo with id ${req.params.id} not found` })

    return res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(400).send('Sorry! Can`t update todo right now! Try again later')
  }
}

function validateNewTodo(req, res, next) {
  try {
    todoSchema.validate(req.body)

    next()
  } catch (error) {
    res.status(400).json({ ' message': 'Missing required fields' })
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  addNewTodo,
  updateTodo,
  removeTodo,
  updateCompleteTodo,
  validateNewTodo
}
