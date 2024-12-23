import express from "express";
import TodoRoutes from "./routes/TodoRoutes";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/Todo", TodoRoutes);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Hello from server side!");
  res.send({ message: "Hello from Server side!" });
});
