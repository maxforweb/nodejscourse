import mongoose from 'mongoose'
import express from 'express';
import { body } from 'express-validator';

import { Todo } from '../models/todo.js';

const router = express.Router();

router.delete('/api/todo/:id', async (req, res) => {
  const id = req.params.id

  await Todo.remove({ _id: id });
  
  res.status(204).send();
})

export { router as deleteTodoRouter };
