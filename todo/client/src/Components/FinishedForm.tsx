import { TmodifiedFinishedTaskProps } from "../../../lib/types";
import logo from "../assets/logo_fixed.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export default function PendingForm({
  _id,
  TaskName,
  TaskDeadline,
  TaskDescription,
  ImageData,
  isPending,
  onPending,
  onDelete,
}: TmodifiedFinishedTaskProps) {
  const params = useParams();
  const [isView, setIsView] = useState(params.taskName ? true : false);
  const navigate = useNavigate();

  // Function to Set a Task into Done
  const HandlePendingTask = async (_id: string) => {
    try {
      // Set Task Done to Client to Remove it from the Page
      if (onPending) {
        onPending(_id);
      }

      // Pass _id to set task to done via server
      const response = await fetch(
        `http://localhost:3000/tasks/${_id}/ModifyIsPending`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isPending: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update finished task to pending task");
      }
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

      // Also Delete Task from Client
      if (onDelete) {
        onDelete(_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const HandleViewTask = (
    _id: string,
    TaskName: string,
    isPending: boolean
  ) => {
    navigate(`/task/${encodeURIComponent(TaskName)}`, {
      state: { id: _id, isPending: isPending },
    });
    setIsView((prevIsView) => !prevIsView);
  };

  const handleBack = () => {
    navigate(-1);
    setIsView((prevIsView) => !prevIsView);
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
    const formattedTime = `${
      hour < 10 ? `0${hour}` : hour
    }:${minutes} ${timeSuffix}`;

    return { formattedDate, formattedTime };
  };

  return (
    <div
      className={`inline-block min-h-[327px] max-w-[339px] w-full bg-[#09d936] rounded-form-radius`}
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
        {isView ? (
          <button
            onClick={() => handleBack()}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            Back
          </button>
        ) : (
          <button
            onClick={() => HandleViewTask(_id, TaskName, isPending)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}
