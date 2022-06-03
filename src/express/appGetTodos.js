import { getTodos } from "../mongodb/getTodos.js";

export const appGetTodos = async (req, res, next) => {
  try {
    const todos = await getTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
