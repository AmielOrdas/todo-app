import Navigation from "../Components/Navigation";
import TodoForm from "../Components/TodoForm";
import { useEffect } from "react";

import "../index.css";

export default function Todo() {
  // Apply useEffect to change title page
  useEffect(() => {
    document.title = "Create Task | Todo";
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[120px]">
        <div className="text-center">
          <TodoForm />
        </div>
      </main>
    </>
  );
}
