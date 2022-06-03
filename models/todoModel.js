import mongoose from 'mongoose'

const Todo = mongoose.Schema({
  label: { type: String, required: true },
  done: { type: Boolean, required: true },
})

export default mongoose.model('Todo', Todo)
