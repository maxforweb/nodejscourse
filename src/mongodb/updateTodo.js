import { Mongo } from "./mongodb.js";

export const updateTodo = async (filter, update) => {
  const collection = await Mongo.collection();

  try {
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.error("Mongodb update failed!", error);
    throw new Error(error.message);
  }
};
