import express, { Request, Response } from "express";
import TaskRoutes from "./routes/TaskRoutes";
import cors from "cors";
import { connectMongoAtlas, getDBVariables } from "./database/db";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectMongoAtlas();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(`Cannot connect to mongoDB Atlas. Error Message: ${error}`);
  }
})();

app.use("/tasks", TaskRoutes);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  console.log("Hello from server side!");
  res.send({ message: "Hello from Server side!" });
});
