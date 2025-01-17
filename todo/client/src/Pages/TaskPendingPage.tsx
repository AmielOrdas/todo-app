import { useEffect, useState } from "react";
import { TtaskProps } from "../../../lib/types";
import Navigation from "../Components/Navigation";
import PendingForm from "../Components/PendingForm";
import "../index.css";
import { ZFetchTasksSchemaClient } from "../../../lib/types";
export default function TaskPendingPage() {
  // Make the Props Dynamic by Stateful Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [pendingTasks, setPendingTasks] = useState<TtaskProps[]>([]);

  // Fetch Pending Tasks Once Page Mounts
  useEffect(() => {
    // Set Title Page
    document.title = "Pending Tasks | Todo";
    const fetchPendingTasks = async () => {
      try {
        // Set credentials to true for cookie authentication
        const response = await fetch("http://localhost:3000/tasks/pending", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch pending tasks");
        }
        data.modifiedData.forEach((task: TtaskProps) => {
          // Validate the data coming from the server using the newTaskSchemaClient zod schema
          const parseResult = ZFetchTasksSchemaClient.safeParse(task);

          if (!parseResult.success) {
            throw new Error("Incorrect data");
          } else {
            // Convert String Date into Date object
            task.TaskDeadline = new Date(task.TaskDeadline);
          }
        });

        // Sort tasks by date if tasks is more than one
        if (data.modifiedData.length > 1) {
          data.modifiedData.sort(
            (task1: TtaskProps, task2: TtaskProps) =>
              task1.TaskDeadline.getTime() - task2.TaskDeadline.getTime()
          );
        }

        // Update Pending Tasks
        setPendingTasks(data.modifiedData);
      } catch (error) {
        console.error(error);
      }
    };
    // Execute Fetching
    fetchPendingTasks();
  }, []);

  useEffect(() => {
    // Sort tasks by date if tasks is more than one
    if (pendingTasks.length > 1) {
      // Check if the tasks are already sorted
      const isAlreadySorted = pendingTasks.every(
        (currentTask, index) =>
          index === 0 ||
          currentTask.TaskDeadline.getTime() >=
            pendingTasks[index - 1].TaskDeadline.getTime()
      );

      // Only update state if tasks are not already sorted
      if (!isAlreadySorted) {
        const updatedTasks = [...pendingTasks].sort(
          (task1, task2) => task1.TaskDeadline.getTime() - task2.TaskDeadline.getTime()
        );
        setPendingTasks(updatedTasks); // Update state directly
      }
    }
  }, [pendingTasks]);

  // Function for editing pending task properties
  const handleEdit = (
    _id: string,
    newTaskName: string,
    newTaskDeadline: Date,
    newTaskDescription: string
  ) => {
    setPendingTasks((prevPendingTasks) =>
      prevPendingTasks.map((pendingTask) =>
        pendingTask._id === _id
          ? {
              ...pendingTask,
              TaskName: newTaskName,
              TaskDeadline: newTaskDeadline,
              TaskDescription: newTaskDescription,
            }
          : pendingTask
      )
    );
  };

  // Function to remove a pending task when set to done or deleted
  const handleRemove = (_id: string) => {
    setPendingTasks((prevPendingTasks) => {
      const updatedPendingTasks = prevPendingTasks.filter(
        (prevPendingTask) => prevPendingTask._id !== _id
      );
      return updatedPendingTasks;
    });
  };

  // Get total pages
  const totalPages = Math.ceil(pendingTasks.length / tasksPerPage);

  // Pagination Logic
  const getPaginatedTasks = () => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return pendingTasks.slice(startIndex, endIndex);
  };

  // Create Function to Handle Pagination
  const handlePagination = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    } else if (currentPage > 1) {
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
              key={task._id}
              {...task}
              onEdit={handleEdit}
              onDone={handleRemove}
              onDelete={handleRemove}
            />
          ))}
        </div>
        {totalPages > 0 && (
          <div className="bottom-0 left-0 w-full flex justify-center space-x-4 p-4">
            <button
              onClick={handlePagination}
              disabled={currentPage === 1}
              className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handlePagination}
              disabled={currentPage === totalPages}
              className="text-2xl font-bold bg-button-red rounded px-2 py-1 hover:bg-red-900 disabled:bg-red-900"
            >
              {">"}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
