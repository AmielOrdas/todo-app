import Navigation from "../Components/Navigation";
import TodoForm from "../Components/TodoForm";

import "../index.css";

export default function Todo() {
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
