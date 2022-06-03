import { nanoid } from "nanoid";
import { createTodo } from "../mongodb/createTodo.js";

export const appCreateTodo = async (req, res, next) => {
  if (!req.body.label) {
    res.status(400).send("label is required");
  }

  const id = nanoid();

  const todo = {
    label: req.body.label,
    id,
    done: false,
  };

  try {
    await createTodo(todo);
    res.status(200).send(`Todo ${id} succesfully created`);
  } catch (error) {
    next(error);
  }
  res.status(200);
};
