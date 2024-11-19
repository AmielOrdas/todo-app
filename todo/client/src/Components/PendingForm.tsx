import { useState } from "react";
import { TpendingTaskProps } from "../../../lib/types";

// Omit "id" property since it will only be used as key when mapping
// Add the Boolean Variables for Edit/Done/Delete

type TmodifiedTaskPendingProps = TpendingTaskProps & {
  onEdit?: (
    id: number,
    newTaskName: string,
    newTaskDeadline: Date,
    newTaskDescription: string
  ) => void;
  onDone?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function PendingForm({
  id,
  taskImage,
  taskName,
  taskDeadline,
  taskDescription,
  onEdit,
  onDone,
  onDelete,
}: TmodifiedTaskPendingProps) {
  // Use Stateful Variables for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(taskName);
  const [editedDate, setEditedDate] = useState(
    taskDeadline.toISOString().substring(0, 10)
  );
  const [editedTime, setEditedTime] = useState(
    taskDeadline.toISOString().substring(11, 16)
  );
  const [editedTaskDescription, setEditedTaskDescription] =
    useState(taskDescription);

  // Function to handle updating
  const handleSaveEdit = () => {
    if (onEdit) {
      const updatedDeadline = new Date(`${editedDate}T${editedTime}`);
      onEdit(id, editedTaskName, updatedDeadline, editedTaskDescription);
    }
    setIsEditing(false);
  };

  // Format Date
  function formatDate(taskDeadline: Date) {
    return `Due: ${taskDeadline.getFullYear()}-${
      taskDeadline.getMonth() < 9
        ? `0${taskDeadline.getMonth() + 1}`
        : taskDeadline.getMonth() + 1
    }-${
      taskDeadline.getDate() < 10
        ? `0${taskDeadline.getDate()}`
        : taskDeadline.getDate()
    }\n${
      taskDeadline.getHours() < 10 && taskDeadline.getHours() !== 0
        ? `0${taskDeadline.getHours()}`
        : taskDeadline.getHours() > 12
        ? taskDeadline.getHours() % 12 < 10
          ? `0${taskDeadline.getHours() % 12}`
          : taskDeadline.getHours() % 12
        : 12
    }:${
      taskDeadline.getMinutes() < 10
        ? `0${taskDeadline.getMinutes()}`
        : taskDeadline.getMinutes()
    } ${taskDeadline.getHours() >= 12 ? "PM" : "AM"}`;
  }

  // EDIT INPUT FOR DATE/TIME, MAKE IT ONE INPUT THEN SET IT TO TYPE datetime-local
  return (
    <div className="min-h-[327px] max-w-[339px] w-full bg-[#ADA823] rounded-form-radius">
      {isEditing ? (
        <>
          <div className="m-4 flex items-start">
            <img className="w-[109px] h-[109px]" src={String(taskImage)} />
            <div className="mx-auto my-auto">
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                placeholder="Edit Task Name"
                className="text-xl w-full overflow-hidden m-1"
              />
              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="text-xl text-center text-black w-full m-1"
              />
              <input
                type="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="text-xl text-center text-black w-full m-1"
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
              onClick={handleSaveEdit}
              disabled={!editedTaskName || !editedTaskDescription}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900 disabled:bg-red-900"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="m-4 flex items-start">
            <img className="w-[109px] h-[109px]" src={String(taskImage)} />
            <div className="mx-auto my-auto">
              <p className="text-xl text-center font-semibold">{`${taskName}-${id}`}</p>
              <p className="text-xl text-center text-red-800">
                {formatDate(taskDeadline)}
              </p>
            </div>
          </div>
          <div className="m-4 w-auto h-[107px] bg-white overflow-y-scroll">
            <p className="m-2 text-justify">{taskDescription}</p>
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
              onClick={() => onDone(id)}
              className="bg-button-red p-1 rounded-lg hover:bg-red-900"
            >
              Done
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
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
