import mongoose from 'mongoose'
import express from 'express';
import { body } from 'express-validator';

import { Todo } from '../models/todo.js';

const router = express.Router();

router.get('/api/todos', async (req, res) => {
  const todo = await Todo.find({})
  
  res.status(200).send(todo);
})

export { router as getTodoRouter };
