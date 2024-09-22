import express from "express";
import newTodoRoute from "./routes/newTodo";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/newTodo", newTodoRoute);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Hello from server side!");
  res.send({ message: "Hello from Server side!" });
});
