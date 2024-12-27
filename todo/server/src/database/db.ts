import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";
import { collections } from "../../../lib/types";

dotenv.config({ path: "../.env" });

const dbURI = process.env.dbURI || "";
let client: MongoClient;

async function connectMongoAtlas(): Promise<MongoClient> {
  client = new MongoClient(dbURI);
  await client.connect();
  return client;
}

function getDBVariables(): collections {
  const db = client.db("TodoDB");
  const TaskCollection = db.collection("Todo");
  const UserCollection = db.collection("User");

  return { TaskCollection, UserCollection };
}

export { connectMongoAtlas, getDBVariables };
