import Todo from '../models/todoModel.js'

class PostService {

  async create(todo) {
    return await Todo.create(todo)
  }

  async getAll() {
    return await Todo.find()
  }

  async update(todo) {
    if (!todo._id) {
      throw new Error('ID is not specified')
    }
    return await Todo.findByIdAndUpdate(todo._id, todo, { new: true })
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID is not specified')
    }
    return await Todo.findByIdAndDelete(id)
  }

  async complete(todo) {
    if (!todo._id) {
      throw new Error('ID is not specified')
    }
    todo.done = true
    return await Todo.findByIdAndUpdate(todo._id, todo, { new: true })
  }

  async uncomplete(todo) {
    if (!todo._id) {
      throw new Error('ID is not specified')
    }
    todo.done = false
    return await Todo.findByIdAndUpdate(todo._id, todo, { new: true })
  }

}

export default new PostService()
