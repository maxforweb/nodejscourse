import { Mongo } from "./mongodb.js";

export const createTodo = async (todo) => {
  const collection = await Mongo.collection();

  try {
    const result = await collection.insertOne(todo);
    return result;
  } catch (error) {
    console.error("Mongodb create failed!", error);
    throw new Error(error.message);
  }
};
