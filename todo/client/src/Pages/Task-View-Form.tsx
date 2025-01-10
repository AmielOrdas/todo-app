import { useEffect, useState } from "react";
import { TtaskProps } from "../../../lib/types";
import { useParams } from "react-router-dom";
import Navigation from "../Components/Navigation";
import FinishedForm from "../Components/FinishedForm";
import PendingForm from "../Components/PendingForm";
export default function TaskViewForm() {
  const { id } = useParams();
  const [task, setTask] = useState<TtaskProps>();
  // Fetch Pending Tasks Once Page Mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Fetch from Get ID Route Using a Task Component's ID to Delete Task from Database
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        const data = await response.json();

        const [task] = data.modifiedData;
        // Convert String Date into Date object
        data.modifiedData.forEach(
          (task: TtaskProps) => (task.TaskDeadline = new Date(task.TaskDeadline))
        );

        // Update Pending Tasks
        setTask(task);
      } catch (error) {
        console.error(error);
      }
    };
    // Execute Fetching
    fetchTask();
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px] flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center py-4">
          {task?.isPending ? (
            <PendingForm key={task._id} {...task} />
          ) : (
            <FinishedForm key={task._id} {...task} />
          )}
        </div>
      </main>
      {/*THIS PART SHOULD MOVE IT INTO THE TASK DONE PAGE*/}
      {/* <h1>DONE TASKS</h1>
        <div>
          {pendingTasks
            .filter((task) => !task.isPending)
            .map((task) => (
              <PendingForm key={task.id} {...task} />
            ))}
        </div> */}
    </>
  );
}
