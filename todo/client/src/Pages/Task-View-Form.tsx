import { useEffect, useState } from "react";
import { TtaskProps } from "../../../lib/types";
import { useLocation } from "react-router-dom";
import Navigation from "../Components/Navigation";
import FinishedForm from "../Components/FinishedForm";
import PendingForm from "../Components/PendingForm";

export default function TaskViewForm() {
  const location = useLocation();
  const taskID = location.state?.id;
  const taskIsPending = location.state?.isPending;
  const [task, setTask] = useState<TtaskProps[]>([]);
  const [taskPending, setTaskPending] = useState<Boolean>(taskIsPending);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskID}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();

        data.modifiedData.forEach(
          (task: TtaskProps) =>
            (task.TaskDeadline = new Date(task.TaskDeadline))
        );
        const newData = data.modifiedData.map((task: TtaskProps) => ({
          ...task, // Copy all properties from the task object
          TaskDeadline: new Date(task.TaskDeadline), // Overwrite TaskDeadline with the new Date
        }));

        setTask(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskPending]);

  const handleEdit = (
    _id: string,
    newTaskName: string,
    newTaskDeadline: Date,
    newTaskDescription: string
  ) => {
    setTask((prevTasks) =>
      prevTasks?.map((pendingTask) =>
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
    setTask((prevPendingTasks) => {
      const updatedPendingTasks = prevPendingTasks.filter(
        (prevPendingTask) => prevPendingTask._id !== _id
      );

      return updatedPendingTasks;
    });
    setTaskPending((prevTaskPending) => !prevTaskPending);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[5px]">
        <div className="text-center my-[160px]">
          {task.map((task) =>
            taskPending ? (
              <PendingForm
                key={task._id}
                {...task}
                onEdit={handleEdit}
                onDone={handleRemove}
                onDelete={handleRemove}
              />
            ) : (
              <FinishedForm
                key={task._id}
                {...task}
                onPending={handleRemove}
                onDelete={handleRemove}
              />
            )
          )}
        </div>
      </main>
    </>
  );
}
