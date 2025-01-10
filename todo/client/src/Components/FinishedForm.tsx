import { useState, useEffect } from "react";
import { TmodifiedFinishedTaskProps } from "../../../lib/types";
import logo from "../assets/logo_fixed.png";
export default function PendingForm({
  _id,
  TaskName,
  TaskDeadline,
  TaskDescription,
  ImageData,
  onPending = () => {
    return;
  },
  onDelete = () => {
    return;
  },
}: TmodifiedFinishedTaskProps) {
  // Use Stateful Variables for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(TaskName);
  const [editedDeadline, setEditedDeadline] = useState(
    TaskDeadline.toISOString().slice(0, 16)
  ); // Datetime-local input
  const [editedTaskDescription, setEditedTaskDescription] = useState(TaskDescription);

  // useEffect(() => {
  //   CheckDue(TaskDeadline);
  //   console.log("USED");
  // }, [currentDate, TaskDeadline]);

  // useEffect(() => {
  //   // Update currentDate periodically
  //   const interval = setInterval(() => {
  //     setCurrentDate(new Date());
  //   }, 1000); // Update every second

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  // Check Every Minute - This will be used as flag to compare
  // const previousMinute = useRef(new Date().getMinutes());

  // const CheckDue = setInterval((TaskDeadline: Date) => {
  //   const currentDate = new Date();
  //   const currentMinute = currentDate.getMinutes();

  //   // Verify if a minute has passed
  //   if (currentMinute !== previousMinute.current) {
  //     // Update the minute
  //     previousMinute.current = currentMinute;

  //     // Compare the Dates
  //     console.log("Current Date: ", currentDate);
  //     if (currentDate < TaskDeadline) {
  //       setIsTaskLapsed(false);
  //     } else {
  //       setIsTaskLapsed(true);
  //     }
  //   }
  // }, 1000);

  // useEffect(() => {
  //   return () => clearInterval(CheckDue);
  // }, []);

  // Function to Set a Task into Done
  const HandlePendingTask = async (_id: string) => {
    try {
      // Set Task Done to Client to Remove it from the Page
      if (onPending) {
        onPending(_id);
      }

      // Pass _id to set task to done via server
      const response = await fetch(`http://localhost:3000/tasks/${_id}/ModifyIsPending`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isPending: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update finished task to pending task");
      }
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Delete a Task
  const HandleDeleteTask = async (_id: string) => {
    try {
      // Fetch from Delete Route Using a Task Component's ID to Delete Task from Database
      const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const result = await response.json();
      console.log(result.message);
      // Also Delete Task from Client
      if (onDelete) {
        onDelete(_id);
        console.log("Deleted task from client successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Format Date
  const formatDate = (TaskDeadline: Date) => {
    // Retrieve and Format Date & Time
    const year = TaskDeadline.getFullYear();
    const month = (TaskDeadline.getMonth() + 1).toString().padStart(2, "0");
    const day = TaskDeadline.getDate().toString().padStart(2, "0");
    let hour = TaskDeadline.getHours();
    const minutes = TaskDeadline.getMinutes().toString().padStart(2, "0");
    const timeSuffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    // Set Formatted Date and Time
    const formattedDate = `Due: ${year}-${month}-${day}`;
    const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${minutes} ${timeSuffix}`;

    return { formattedDate, formattedTime };
  };

  return (
    <div
      className={`min-h-[327px] max-w-[339px] w-full bg-[#09d936] rounded-form-radius`}
    >
      <div>
        <div className="m-4 flex items-start">
          {ImageData ? (
            <img
              className="w-[109px] h-[109px]"
              src={`data:image/ [image format];base64,${ImageData}`}
            />
          ) : (
            <img src={logo} className="w-[109px] h-[109px]" />
          )}

          <div className="mx-auto my-auto">
            <p className="text-xl text-center font-semibold">{`${TaskName}`}</p>
            <p className="text-xl text-center text-red-800 font-bold">
              {formatDate(TaskDeadline).formattedDate}
            </p>
            <p className="text-xl text-center text-red-800 font-bold">
              {formatDate(TaskDeadline).formattedTime}
            </p>
          </div>
        </div>
        <div className="m-4 w-auto h-[107px] bg-white overflow-y-scroll">
          <p className="m-2 text-justify">{TaskDescription}</p>
        </div>
      </div>

      {isEditing || (
        <div className="m-4 flex justify-start space-x-4">
          <button
            onClick={() => HandlePendingTask(_id)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            Pending
          </button>

          <button
            onClick={() => HandleDeleteTask(_id)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
