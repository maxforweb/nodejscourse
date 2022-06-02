import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});


const Todo = mongoose.model('Todo', todoSchema);

export { Todo }
