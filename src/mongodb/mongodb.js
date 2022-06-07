import mongo from "mongodb";

export class Mongo {
  constructor() {
    this.instance;
  }

  static async collection() {
    if (!this.instance) {
      try {
        const mongoClient = new mongo.MongoClient(process.env.DB_URI);
        console.log("Connecting to MongoDB Atlas cluster...");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");
        const collection = await mongoClient
          .db("nodejscourse")
          .collection("todos");
        this.instance = collection;
      } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
      }
    }
    return this.instance;
  }
}
