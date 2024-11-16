import { useState } from "react";
import { TpendingTaskProps } from "../../../lib/types";

export default function PendingForm({
  taskImage,
  taskName,
  taskDeadline,
  taskDescription,
}: TpendingTaskProps) {
  // Stateful Variable for Page Number Checking
  const [pageNum, setPageNum] = useState(0);
  // Get Four Tasks per Page
  function getFourTasks(taskArray) {
    // Get the four tasks with respect to the activated page from the array
    const fourTasks = taskArray.slice(pageNum * 4, (pageNum + 1) * 4);
    // Convert the properties into strings
    return fourTasks.map((value, index) =>
      index === fourTasks.length - 1
        ? ` ${String(value)}`
        : ` ${String(value)},`
    );
  }

  function getAllTasks(taskArray) {
    return taskArray.map((value, index) =>
      index === taskArray.length - 1
        ? ` ${String(value)}`
        : ` ${String(value)},`
    );
  }

  return (
    <div className="min-h-[327px] max-w-[339px] w-full bg-[#ADA823] rounded-form-radius">
      <div className="m-4 flex items-start">
        <img className="w-[109px] h-[109px]" src={taskImage[0]} />
        <div className="mx-auto my-auto">
          <p className="text-xl">{taskName}</p>
          <p className="text-xl">{String(taskDeadline[0])}</p>
        </div>
      </div>
      <div className="m-4 w-auto h-[107px] bg-white">
        <p>{taskDescription[0]}</p>
      </div>
      <div className="m-4 flex justify-start space-x-4">
        <button className="bg-button-red p-1 rounded-lg hover:bg-red-900">
          Done
        </button>
        <button className="bg-button-red p-1 rounded-lg hover:bg-red-900">
          Edit
        </button>
        <button className="bg-button-red p-1 rounded-lg hover:bg-red-900">
          Delete
        </button>
      </div>
    </div>
  );
}
