import { deleteTodo } from "../mongodb/deleteTodo.js";

export const appDeleteTodo = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("wrong request");
  }

  const filter = { id };

  try {
    await deleteTodo(filter);
    res.status(200).send(`Todo ${id} succesfully deleted`);
  } catch (error) {
    next(error);
  }
  res.status(200);
};
