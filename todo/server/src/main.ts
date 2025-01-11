import express, { Request, Response } from "express";
import TaskRoutes from "./routes/TaskRoutes";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";
import { connectMongoAtlas } from "./database/db";
import rateLimit from "express-rate-limit";
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

// // Create a rate limiter
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests, please try again later.",
// });

// // Apply the rate limiter to all requests
// app.use(limiter);

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
  console.log("Hello from server side!");
  res.send({ message: "Hello from Server side!" });
});
