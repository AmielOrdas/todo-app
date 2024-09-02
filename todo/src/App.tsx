import Todo from "./Pages/Todo";
import TaskFinishedList from "./Pages/Task-Finished-List";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      {/*Put login here */}
      {/*Put task-pending here */}
      <Route path="/finished-tasks" element={<TaskFinishedList />} />
    </Routes>
  );
}

export default App;
