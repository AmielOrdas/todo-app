import Todo from "./Pages/Todo";
import Login from "./Pages/Login";
import TaskFinishedList from "./Pages/Task-Finished-List";
import TaskPendingList from "./Pages/Task-Pending-List";
import TaskViewForm from "./Pages/Task-View-Form";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import SignUp from "./Pages/Signup";

function DummyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Login");
  }, [navigate]);

  return <h1>Redirecting to login page</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DummyPage />} />
      <Route path="/Todo" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pending-tasks" element={<TaskPendingList />} />
      <Route path="/finished-tasks" element={<TaskFinishedList />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/task/:taskName" element={<TaskViewForm />} />
    </Routes>
  );
}

export default App;
