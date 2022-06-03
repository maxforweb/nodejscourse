import mongo from "mongodb";

const URI =
  "mongodb+srv://nodejscourse:L7K4Tldfw0X6rg7S@cluster0.iwbiy.mongodb.net/?retryWrites=true&w=majority";

export class Mongo {
  constructor() {
    this.instance;
  }

  static async collection() {
    if (!this.instance) {
      try {
        const mongoClient = new mongo.MongoClient(URI);
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
