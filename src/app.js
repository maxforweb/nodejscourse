import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { newTodoRouter } from './routes/create.js';
import { getTodoRouter } from './routes/get.js';
import { deleteTodoRouter } from './routes/delete.js';
import { updateTodoRouter } from './routes/update.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyParser.json());
app.use(cors());

app.use(newTodoRouter);
app.use(getTodoRouter);
app.use(deleteTodoRouter);
app.use(updateTodoRouter);

export { app };
