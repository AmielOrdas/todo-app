import { useState } from "react";
import { TmodifiedTaskPendingProps } from "../../../lib/types";

// Remove "Edit" Button for Finished Tasks and Add "Delete" Button

// type TmodifiedTaskPendingProps = TpendingTaskProps & {
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
  onEdit,
  onDone,
  onDelete,
}: TmodifiedTaskPendingProps) {
  // Use Stateful Variables for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(TaskName);
  const [editedDeadline, setEditedDeadline] = useState(
    TaskDeadline.toISOString().slice(0, 16)
  ); // Datetime-local input
  const [editedTaskDescription, setEditedTaskDescription] =
    useState(TaskDescription);

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

  // Format Date
  function formatDate(TaskDeadline: Date) {
    return `Due: ${TaskDeadline.getFullYear()}-${
      TaskDeadline.getMonth() < 9
        ? `0${TaskDeadline.getMonth() + 1}`
        : TaskDeadline.getMonth() + 1
    }-${
      TaskDeadline.getDate() < 10
        ? `0${TaskDeadline.getDate()}`
        : TaskDeadline.getDate()
    }\n${
      TaskDeadline.getHours() < 10 && TaskDeadline.getHours() !== 0
        ? `0${TaskDeadline.getHours()}`
        : TaskDeadline.getHours() > 12
        ? TaskDeadline.getHours() % 12 < 10
          ? `0${TaskDeadline.getHours() % 12}`
          : TaskDeadline.getHours() % 12
        : 12
    }:${
      TaskDeadline.getMinutes() < 10
        ? `0${TaskDeadline.getMinutes()}`
        : TaskDeadline.getMinutes()
    } ${TaskDeadline.getHours() >= 12 ? "PM" : "AM"}`;
  }

  // EDIT INPUT FOR DATE/TIME, MAKE IT ONE INPUT THEN SET IT TO TYPE datetime-local
  return (
    <div className="min-h-[327px] max-w-[339px] w-full bg-[#ADA823] rounded-form-radius">
      {isEditing ? (
        <>
          <div className="m-4 flex items-start">
            <img
              className="w-[109px] h-[109px]"
              src={`data:image/ [image format];base64,${ImageData}`}
            />
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
              className="bg-button-red p-1 rounded-lg hover:bg-red-900 disabled:bg-red-900"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900 disabled:bg-red-900"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="m-4 flex items-start">
            <img
              className="w-[109px] h-[109px]"
              src={`data:image/ [image format];base64,${ImageData}`}
            />
            <div className="mx-auto my-auto">
              <p className="text-xl text-center font-semibold">{`${TaskName}`}</p>
              <p className="text-xl text-center text-red-800">
                {formatDate(TaskDeadline)}
              </p>
            </div>
          </div>
          <div className="m-4 w-auto h-[107px] bg-white overflow-y-scroll">
            <p className="m-2 text-justify">{TaskDescription}</p>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="m-4 flex justify-start space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-button-red p-1 rounded-lg hover:bg-red-900"
          >
            Edit
          </button>
          {onDone && (
            <button
              onClick={() => onDone(_id)}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900"
            >
              Done
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => HandleDeleteTask(_id)}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
