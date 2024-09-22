import Navigation from "../Components/Navigation";
import PendingForm from "../Components/PendingForm";
import "../index.css";

export default function TaskPendingList() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px] flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          <PendingForm />
          <PendingForm />
          <PendingForm />
          <PendingForm />
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center space-x-4 p-4">
          <button className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900">
            {"<"}
          </button>
          <button className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900">
            {">"}
          </button>
        </div>
      </main>
    </>
  );
}
