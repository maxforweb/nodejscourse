import { MongoClient } from "mongodb";

const mongoPassword = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://admin:${mongoPassword}@cluster0.ampj0.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri);