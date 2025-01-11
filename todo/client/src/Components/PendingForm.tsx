import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TmodifiedPendingTaskProps } from "../../../lib/types";
import logo from "../assets/logo_fixed.png";
// Remove "Edit" Button for Finished Tasks and Add "Delete" Button

// type TmodifiedPendingTaskProps = TpendingTaskProps & {
//   onEdit?: (
//     id: number,
//     newTaskName: string,
//     newTaskDeadline: Date,
//     newTaskDescription: string
//   ) => void;
//   onDone?: (id: number) => void;
//   onDelete?: (id: number) => void;
// };

export default function PendingForm({
  _id,
  TaskName,
  TaskDeadline,
  TaskDescription,
  ImageData,
  isPending,
  onEdit,
  onDone,
  onDelete,
}: TmodifiedPendingTaskProps) {
  // Use Stateful Variables for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(TaskName);
  const [editedDeadline, setEditedDeadline] = useState(
    TaskDeadline.toISOString().slice(0, 16)
  ); // Datetime-local input
  const [editedTaskDescription, setEditedTaskDescription] = useState(TaskDescription);
  const currentDate = new Date();
  // Stateful Variable for Checking if Task Lapsed
  const [color, setColor] = useState<String>(
    currentDate < TaskDeadline ? "bg-[#ADA823]" : "bg-[#e83d3d]"
  );
  const params = useParams();
  console.log(params.taskName);
  const [isView, setIsView] = useState(params.taskName ? true : false);
  const navigate = useNavigate();
  // useEffect to check if task lapsed
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const isPastDue = currentDate > TaskDeadline;
      setColor((prevColor) => {
        const newColor = isPastDue ? "bg-[#e83d3d]" : "bg-[#ADA823]";

        return prevColor === newColor ? prevColor : newColor;
      });
    }, 1000);
    return () => clearInterval(interval); // Cleanup code
  }, [TaskDeadline]); // Restart interval if TaskDeadline changes

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
  const HandleDoneTask = async (_id: string) => {
    try {
      // Set Task Done to Client to Remove it from the Page
      if (onDone) {
        onDone(_id);
      }

      // Pass _id to set task to done via server
      const response = await fetch(`http://localhost:3000/tasks/${_id}/ModifyIsPending`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isPending: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Save and Update Task
  const HandleSaveUpdateTask = async (
    _id: string,
    editedTaskName: string,
    editedDeadline: string,
    editedTaskDescription: string
  ) => {
    try {
      // Update from Client
      if (onEdit) {
        const newTaskDeadline = new Date(editedDeadline);
        onEdit(_id, editedTaskName, newTaskDeadline, editedTaskDescription);
      }
      // console.log("_id:", _id);
      // console.log("editedTaskName:", editedTaskName);
      // console.log("editedDeadline:", editedDeadline);
      // console.log("editedTaskDescription:", editedTaskDescription);

      // Pass _id and other updated task properties
      const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TaskName: editedTaskName,
          TaskDeadline: editedDeadline,
          TaskDescription: editedTaskDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const result = await response.json();
      console.log(result.message);

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Cancel Editing
  const handleCancelEdit = () => {
    setIsEditing(false);
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

  const HandleViewTask = (_id: string, TaskName: string, isPending: boolean) => {
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
    const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${minutes} ${timeSuffix}`;

    return { formattedDate, formattedTime };
  };
  console.log("Pending");
  return (
    <div
      className={`inline-block min-h-[327px] max-w-[339px] w-full ${color} rounded-form-radius`}
    >
      {isEditing ? (
        <>
          <div className="m-4 flex items-start">
            {ImageData ? (
              <img
                className="w-[109px] h-[109px]"
                src={`data:image/ [image format];base64,${ImageData}`}
              />
            ) : (
              <img src={logo} className="w-[90px] h-[90px]" />
            )}
            <div className="mx-auto my-auto">
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                placeholder="Edit Task Name"
                className="text-xl w-full overflow-hidden m-1"
              />
              <input
                type="datetime-local"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
                className="text-l text-center text-black w-full m-1"
              />
            </div>
          </div>
          <div className="m-4 w-auto h-[107px] bg-white overflow-y-scroll">
            <textarea
              value={editedTaskDescription}
              onChange={(e) => setEditedTaskDescription(e.target.value)}
              placeholder="Edit Task Description"
              className="w-full h-full overflow-hidden resize-none"
            />
          </div>
          <div className="m-4 flex justify-start space-x-4">
            <button
              onClick={() =>
                HandleSaveUpdateTask(
                  _id,
                  editedTaskName,
                  editedDeadline,
                  editedTaskDescription
                )
              }
              disabled={!editedTaskName || !editedTaskDescription}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900 disabled:bg-red-900 font-semibold"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900 disabled:bg-red-900 font-semibold"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
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
      )}

      {isEditing || (
        <div className="m-4 flex justify-start space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            Edit
          </button>

          <button
            onClick={() => HandleDoneTask(_id)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900 font-semibold"
          >
            Done
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
      )}
    </div>
  );
}
