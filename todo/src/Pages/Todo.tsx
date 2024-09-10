import Navigation from "../Components/Navigation";
import TodoForm from "../Components/TodoForm";
export default function Todo() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[175px]">
        <div className="text-center">
          <TodoForm />
        </div>
      </main>
    </>
  );
}
