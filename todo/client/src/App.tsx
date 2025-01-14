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
import NotFound from "./Pages/NotFound";
import Cookies from "js-cookie";
function DummyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve Token from Cookies
    const token = Cookies.get("token");
    // Navigate to Login Page if no token in cookies
    if (token) {
      navigate("/Todo");
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  return <h1>Redirecting to login page</h1>;
}

function App() {
  return (
    <Routes>
      {/*Directs to login page when root route is accessed */}
      <Route path="/" element={<DummyPage />} />{" "}
      {/*Directs to not found page when path does not exist */}
      <Route path="*" element={<NotFound />} />
      <Route
        path="/Todo"
        element={
          <ProtectedRoute>
            {/*Directs to Todo page when authorized (token present in cookies) */}
            <Todo />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/pending-tasks"
        element={
          <ProtectedRoute>
            {/*Directs to TaskPending page when authorized (token present in cookies) */}
            <TaskPendingList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finished-tasks"
        element={
          <ProtectedRoute>
            {/*Directs to Task Finished Page when authorized (token present in cookies) */}
            <TaskFinishedList />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/task/:taskName"
        element={
          <ProtectedRoute>
            {/*Directs to Task View Form Page when authorized (token present in cookies) */}
            <TaskViewForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
