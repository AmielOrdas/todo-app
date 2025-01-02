import express, { Request, Response } from "express";
import TaskRoutes from "./routes/TaskRoutes";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";
import { connectMongoAtlas, getDBVariables } from "./database/db";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

(async () => {
  try {
    await connectMongoAtlas();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(`Cannot connect to mongoDB Atlas. Error Message: ${error}`);
  }
})();

export const { TaskCollection, UserCollection } = getDBVariables();

app.use("/users", UserRoutes);

app.use("/tasks", TaskRoutes);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  console.log("Hello from server side!");
  res.send({ message: "Hello from Server side!" });
});
