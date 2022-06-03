import express from "express";
import { appGetTodos } from "./src/express/appGetTodos.js";
import { appCreateTodo } from "./src/express/appCreateTodo.js";
import { appUpdateTodo } from "./src/express/appUpdateTodo.js";
import { appCompleteTodo } from "./src/express/appCompleteTodo.js";
import { appDeleteTodo } from "./src/express/appDeleteTodo.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", appGetTodos);

app.post("/create", appCreateTodo);

app.put("/update", appUpdateTodo);

app.put("/complete", appCompleteTodo);

app.delete("/delete/:id", appDeleteTodo);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
