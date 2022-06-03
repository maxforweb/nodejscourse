import { updateTodo } from "../mongodb/updateTodo.js";
import { getTodo } from "../mongodb/getTodo.js";

export const appCompleteTodo = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send("id is required");
  }

  const filter = { id };

  const todo = await getTodo(filter);

  const update = { $set: { done: !todo.done } };

  try {
    await updateTodo(filter, update);
    res.status(200).send(`Todo ${id} succesfully (un)completed`);
  } catch (error) {
    next(error);
  }
  res.status(200);
};
