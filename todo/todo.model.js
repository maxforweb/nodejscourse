const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  label: { type: String, required: true },
  done: { type: Boolean, required: true, default: false }
})

const todoModel = mongoose.model('Todo', todoSchema)

module.exports = todoModel
