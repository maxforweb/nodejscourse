import { Mongo } from "./mongodb.js";

export const getTodo = async (filter) => {
  const collection = await Mongo.collection();

  try {
    const result = await collection.findOne(filter);
    return result;
  } catch (error) {
    console.error("Get todo failed!", error);
    throw new Error(error.message);
  }
};
