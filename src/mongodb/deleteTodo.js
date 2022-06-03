import { Mongo } from "./mongodb.js";

export const deleteTodo = async (filter) => {
  const collection = await Mongo.collection();

  try {
    const result = await collection.deleteOne(filter);
    if (result.deletedCount === 0) {
      throw new Error("todo was not found");
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
