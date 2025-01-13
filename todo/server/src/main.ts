import express, { Request, Response } from "express";
import TaskRoutes from "./routes/TaskRoutes";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";
import { connectMongoAtlas } from "./database/db";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allows http://localhost:5173 to interact with the server.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allows these HTTP requests to interact with the server.
    credentials: true, // Includes the cookies or any other authorization keys in the HTTP payload.
  })
);
app.use(express.json()); // Parses JSON data from incoming HTTP requests.

app.use(cookieParser()); // Parses HTTP cookies from incoming HTTP requests.

// This function that connects to mongoDB Atlas
(async () => {
  try {
    await connectMongoAtlas();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(`Cannot connect to mongoDB Atlas. Error Message: ${error}`);
  }
})();

app.use("/users", UserRoutes);

app.use("/tasks", TaskRoutes);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  console.log("Server Running");
  res.send({ message: "Server Running" });
});
