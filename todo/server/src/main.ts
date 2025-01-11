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
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

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
