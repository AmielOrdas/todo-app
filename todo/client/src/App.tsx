import Todo from "./Pages/Todo";
import Login from "./Pages/Login";
import TaskFinishedList from "./Pages/Task-Finished-List";
import TaskPendingList from "./Pages/Task-Pending-List";
import { Route, Routes } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pending-tasks" element={<TaskPendingList />} />
      <Route path="/finished-tasks" element={<TaskFinishedList />} />
    </Routes>
  );
}

export default App;
