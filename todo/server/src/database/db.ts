import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";
import { collections } from "../../../lib/types";

dotenv.config({ path: "../.env" });

const dbURI = process.env.dbURI || "";
let client: MongoClient;

// This function connects to the server to mongoDB Atlas
async function connectMongoAtlas() {
  if (!client) {
    client = new MongoClient(dbURI);
    await client.connect();
  }
}
// This function retrieves the collections from the database to the server for code representation.
function getDBVariables(): collections {
  const db = client.db("TodoDB");
  const TaskCollection = db.collection("Todo"); // TaskCollection represents the Todo Collection in code.
  const UserCollection = db.collection("User"); // UserCollection represents the User collection in code.

  return { TaskCollection, UserCollection };
}

export { connectMongoAtlas, getDBVariables };
