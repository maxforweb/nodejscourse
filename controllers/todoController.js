import TodoService from '../services/todoService.js'

class TodoController {

  async create(req, res) {
    try {
      const todo = await TodoService.create(req.body)
      res.json(todo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async getAll(req, res) {
    try {
      const todos = await TodoService.getAll()
      return res.json(todos)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async update(req, res) {
    try {
      const updatedTodo = await TodoService.update(req.body)
      return res.json(updatedTodo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body
      const todo = await TodoService.delete(id)
      return res.json(todo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async complete(req, res) {
    try {
      const completedTodo = await TodoService.complete(req.body)
      return res.json(completedTodo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async uncomplete(req, res) {
    try {
      const uncompletedTodo = await TodoService.uncomplete(req.body)
      return res.json(uncompletedTodo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

}

export default new TodoController
