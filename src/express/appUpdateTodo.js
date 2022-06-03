import { updateTodo } from "../mongodb/updateTodo.js";

export const appUpdateTodo = async (req, res, next) => {
  const { id, label } = req.body;
  if (!label) {
    res.status(400).send("label is required");
  }
  if (!id) {
    res.status(400).send("id is required");
  }

  const filter = { id };

  const update = { $set: { label } };

  try {
    await updateTodo(filter, update);
    res.status(200).send(`Todo ${id} succesfully updated`);
  } catch (error) {
    next(error);
  }
  res.status(200);
};
