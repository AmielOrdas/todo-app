import { TpendingTaskProps } from "../../../lib/types";
import Navigation from "../Components/Navigation";
import PendingForm from "../Components/PendingForm";
import "../index.css";

export default function TaskPendingList() {
  // Props for Testing PendingForm Component
  // Make the Props Dynamic by Using Stateful Variables
  const testProps: TpendingTaskProps[] = [
    {
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
  ];
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px] flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          <PendingForm
            taskImage={testProps[0].taskImage}
            taskName={testProps[0].taskName}
            taskDeadline={testProps[0].taskDeadline}
            taskDescription={testProps[0].taskDescription}
          />
          <PendingForm
            taskImage={testProps[0].taskImage}
            taskName={testProps[0].taskName}
            taskDeadline={testProps[0].taskDeadline}
            taskDescription={testProps[0].taskDescription}
          />
          <PendingForm
            taskImage={testProps[0].taskImage}
            taskName={testProps[0].taskName}
            taskDeadline={testProps[0].taskDeadline}
            taskDescription={testProps[0].taskDescription}
          />
          <PendingForm
            taskImage={testProps[0].taskImage}
            taskName={testProps[0].taskName}
            taskDeadline={testProps[0].taskDeadline}
            taskDescription={testProps[0].taskDescription}
          />
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
