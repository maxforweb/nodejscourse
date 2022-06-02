import mongoose from 'mongoose'
import express from 'express';
import { body } from 'express-validator';

import { Todo } from '../models/todo.js';

const router = express.Router();

router.post('/api/createTodo', async (req, res) => {
  const { label, done } = req.body;

  const todo = new Todo({ label, done })

  await todo.save();
  
  res.status(201).send(todo);
})

export { router as newTodoRouter };
