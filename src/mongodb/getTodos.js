import omit from "lodash/omit.js";
import { Mongo } from "./mongodb.js";

export const getTodos = async () => {
  const collection = await Mongo.collection();

  try {
    const result = await await collection.find({}).toArray();

    return result.map((todo) => omit(todo, "_id"));
  } catch (error) {
    console.error("Mongodb read failed!", error);
    throw new Error(error.message);
  }
};
