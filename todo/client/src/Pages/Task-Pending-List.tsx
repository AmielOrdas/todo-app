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
  const [pendingTasks, setPendingTasks] = useState<TpendingTaskProps[]>([
    {
      id: 1,
      isDone: false,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task 1",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 2,
      isDone: false,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task 2",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 3,
      isDone: false,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task 3",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 4,
      isDone: false,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task 4",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
    {
      id: 5,
      isDone: false,
      taskImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGQ4LhVFNt4fyeu6ZUpT_6KTxdeJ7yVpwxw&s",
      taskName: "Test Task 5",
      taskDeadline: new Date(2024, 11, 25, 13, 8),
      taskDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam animi id asperiores earum molestiae temporibus quibusdam accusantium tempora nam ullam fuga, voluptas ea omnis quasi consequatur minus obcaecati aperiam.",
    },
  ]);

  // Placeholder Array for Tasks Done
  // const [doneTasks, setDoneTasks] = useState<TpendingTaskProps[]>([]);

  // Function for editing pending task properties
  const handleEdit = (
    id: number,
    newTaskName: string,
    newTaskDeadline: Date,
    newTaskDescription: string
  ) => {
    setPendingTasks((prevPendingTasks) =>
      prevPendingTasks.map((pendingTask) =>
        pendingTask.id === id
          ? {
              ...pendingTask,
              taskName: newTaskName,
              taskDeadline: newTaskDeadline,
              taskDescription: newTaskDescription,
            }
          : pendingTask
      )
    );
  };

  // Function to set a pending task into done task
  const handleDone = (id: number) => {
    setPendingTasks((prevPendingTask) =>
      prevPendingTask.map((task) =>
        task.id === id ? { ...task, isDone: true } : task
      )
    );
  };

  // Function to move a pending task into the tasks done
  // const handleDone = (id: number) => {
  //   setPendingTasks((prevPendingTasks) => {
  //     const pendingTaskToDone = prevPendingTasks.find(
  //       (pendingTask) => pendingTask.id === id
  //     );

  //     if (pendingTaskToDone) {
  //       setDoneTasks((prevDoneTasks) => {
  //         const newDoneTasks = [
  //           ...prevDoneTasks,
  //           { ...pendingTaskToDone, id: prevDoneTasks.length + 1 },
  //         ];
  //         return newDoneTasks;
  //       });

  //       // Remove the Task from Pending Tasks then Update IDs
  //       const updatedPendingTasks = prevPendingTasks.filter(
  //         (pendingTask) => pendingTask.id !== id
  //       );
  //       return updatedPendingTasks.map((pendingTask, index) => ({
  //         ...pendingTask,
  //         id: index + 1,
  //       }));
  //     }
  //     return prevPendingTasks;
  //   });
  // };

  // Function to remove a pending task
  const handleDelete = (id: number) => {
    setPendingTasks((prevPendingTasks) => {
      const updatedPendingTasks = prevPendingTasks.filter(
        (prevPendingTask) => prevPendingTask.id !== id
      );
      return updatedPendingTasks.map((pendingTask, index) => ({
        ...pendingTask,
        id: index + 1,
      }));
    });
  };

  // Filter the Tasks by only applying pagination to Pending Tasks
  const currentPendingTasks = pendingTasks.filter((task) => !task.isDone);
  // Get total pages
  const totalPages = Math.ceil(currentPendingTasks.length / tasksPerPage);
  // Pagination Logic
  function getPaginatedTasks() {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return currentPendingTasks.slice(startIndex, endIndex);
  }
  // const startIndex = (currentPage - 1) * tasksPerPage;
  // const endIndex = startIndex + tasksPerPage;
  // const currentPendingTasks = pendingTasks.slice(startIndex, endIndex);

  // Create Function to Handle Forward Paging
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  // Create Function to Handle Backward Paging
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px] flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          {getPaginatedTasks().map((task) => (
            <PendingForm
              key={task.id}
              {...task}
              onEdit={handleEdit}
              onDone={handleDone}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {totalPages > 0 && (
          <div className="bottom-0 left-0 w-full flex justify-center space-x-4 p-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
            >
              {">"}
            </button>
          </div>
        )}
      </main>
      {/*THIS PART SHOULD MOVE IT INTO THE TASK DONE PAGE*/}
      <h1>DONE TASKS</h1>
      <div>
        {pendingTasks
          .filter((task) => task.isDone)
          .map((task) => (
            <PendingForm key={task.id} {...task} />
          ))}
      </div>
    </>
  );
}
