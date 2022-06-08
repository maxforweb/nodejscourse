import _ from "lodash";
import { ObjectId } from "mongodb";
import { client } from "../mongo-db.js";

const dbname = "todos";
const db = client.db(dbname);
const collection = db.collection("todo-list");

export async function readTodos(_req, res) {
  const findResult = await collection.find().toArray();
  res.send(findResult);
}

export async function createTodo(req, res) {
  const { label } = req.body;

  if (!label || !_.isString(label)) return res.sendStatus(400);

  const toDo = {
    label: label,
    done: false
  }

  const createResult = await collection.insertOne(toDo);

  const findResult = await collection.findOne(createResult.insertedId);
  res.send(findResult);
}

export async function updateTodo(req, res) {
  const { id } = req.params;

  const { label } = req.body;

  if (!label || !_.isString(label)) return res.sendStatus(400);

  const updateResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { label } }
  );
  if (!updateResult.modifiedCount) return res.sendStatus(404);

  const findResult = await collection.findOne({ _id: new ObjectId(id) });
  res.send(findResult);
}

export async function completeTodo(req, res) {
  const { id } = req.params;

  const { done } = req.body;

  if (!_.isBoolean(done)) return res.sendStatus(400);

  const completeResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { done } }
  );
  if (!completeResult.modifiedCount) return res.sendStatus(404);

  const findResult = await collection.findOne({ _id: new ObjectId(id) });
  res.send(findResult);
}

export async function deleteTodo(req, res) {
  const { id } = req.params;

  const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
  if (!deleteResult.deletedCount) return res.sendStatus(404);

  const findResult = await collection.find().toArray();
  res.send(findResult);
}