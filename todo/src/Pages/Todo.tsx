import Navigation from "../Components/Navigation";
import TodoForm from "../Components/TodoForm";
export default function Todo() {
  return (
    <>
      <Navigation />
      <main className="h-screen bg-background-color-main pt-[175px]">
        <div className="border-2 border-red-500 text-center">
          <TodoForm />
        </div>

        <h1>Todo page</h1>
      </main>
    </>
  );
}
