import Navigation from "../Components/Navigation";
import { useEffect, useState } from "react";
import { TtaskProps } from "../../../lib/types";
import FinishedForm from "../Components/FinishedForm";
import { ZFetchTasksSchemaClient } from "../../../lib/types";
export default function TaskFinishedPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [finishedTasks, setFinishedTasks] = useState<TtaskProps[]>([]);

  useEffect(() => {
    // Set Title Page
    document.title = "Finished Tasks | Todo";
    (async function fetchFinishedTasks() {
      try {
        // Set credentials to true for cookie authentication
        const response = await fetch("http://localhost:3000/tasks/finished", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        // Validate the data coming from the server using the newTaskSchemaClient zod schema
        data.modifiedData.forEach((task: TtaskProps) => {
          const parseResult = ZFetchTasksSchemaClient.safeParse(task);
          if (!parseResult.success) {
            throw new Error("Incorrect data");
          } else {
            // Convert String Date into Date object
            task.TaskDeadline = new Date(task.TaskDeadline);
          }
        });

        // Update FinishedTask
        setFinishedTasks(data.modifiedData);
      } catch (error) {
        console.error(error);
      }
    })();
    // Execute Fetching
  }, []);

  // This function removes the pending task and returns the finished tasks.
  function handleRemove(_id: string) {
    setFinishedTasks((prevFinishedTasks) => {
      const updatedFinishedTasks = prevFinishedTasks.filter(
        (finishedTask) => finishedTask._id !== _id
      );
      return updatedFinishedTasks;
    });
  }

  // Get four finished task per page logic
  const totalPages = Math.ceil(finishedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const finishedTasksPerPage = finishedTasks.slice(startIndex, endIndex);

  function handlePagination() {
    // Next Page
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
      // Previous Page
    } else if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px]">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          {finishedTasksPerPage.map((task) => (
            <FinishedForm
              key={task._id}
              {...task}
              onPending={handleRemove}
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
