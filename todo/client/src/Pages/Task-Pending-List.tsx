import { useState } from "react";
import { TpendingTaskProps } from "../../../lib/types";
import Navigation from "../Components/Navigation";
import PendingForm from "../Components/PendingForm";
import "../index.css";

export default function TaskPendingList() {
  // Make the Props Dynamic by Stateful Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  // Props for Testing PendingForm Component
  const testProps: TpendingTaskProps[] = [
    {
      id: 1,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 2,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 3,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 4,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 5,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
  ];

  // Set the Indexes based on Number of Tasks and Current Page
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentPendingTasks = testProps.slice(startIndex, endIndex);

  // Create Function to Handle Forward Paging
  const nextPage = () => {
    if (currentPage < Math.ceil(testProps.length / tasksPerPage)) {
      setCurrentPage((currentP) => currentP + 1);
    }
  };

  // Create Function to Handle Backward Paging
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentP) => currentP - 1);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px] flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          {currentPendingTasks.map((task) => (
            <PendingForm
              key={task.id}
              taskImage={task.taskImage}
              taskName={task.taskName}
              taskDeadline={task.taskDeadline}
              taskDescription={task.taskDescription}
            />
          ))}
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center space-x-4 p-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
          >
            {"<"}
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(testProps.length / tasksPerPage)
            }
            className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
          >
            {">"}
          </button>
        </div>
      </main>
    </>
  );
}
