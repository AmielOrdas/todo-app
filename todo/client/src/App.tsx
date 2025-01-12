import Todo from "./Pages/Todo";
import Login from "./Pages/Login";
import TaskFinishedList from "./Pages/Task-Finished-List";
import TaskPendingList from "./Pages/Task-Pending-List";
import TaskViewForm from "./Pages/Task-View-Form";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import SignUp from "./Pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

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
      <Route
        path="/Todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/pending-tasks"
        element={
          <ProtectedRoute>
            <TaskPendingList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finished-tasks"
        element={
          <ProtectedRoute>
            <TaskFinishedList />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/task/:taskName"
        element={
          <ProtectedRoute>
            <TaskViewForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
