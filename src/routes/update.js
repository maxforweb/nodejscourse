// update title
// and mark it as completed/not completed
import mongoose from 'mongoose'
import express from 'express';
import { body } from 'express-validator';

import { Todo } from '../models/todo.js';

const router = express.Router();

router.put('/api/updateTodo/:id', async (req, res) => {
  const id = req.params.id
  const { label, done } = req.body;

  const todo = await Todo.findById(id);

  if (todo) {
    await todo.set({
      label: label || todo.label,
      done: done || todo.done
    })

    await todo.save();

    res.status(200).send(todo);
  } else {
    res.status(404).send();
  }
})

export { router as updateTodoRouter };
