import { TpendingTaskProps } from "../../../lib/types";

// Omit "id" property since it will only be used as key when mapping
export default function PendingForm({
  taskImage,
  taskName,
  taskDeadline,
  taskDescription,
}: Omit<TpendingTaskProps, "id">) {
  // function Done
  // function Edit
  // function Delete

  // Format Date
  function formatDate(taskDeadline: Date) {
    return `Due: ${taskDeadline.getFullYear()}-${
      taskDeadline.getMonth() + 1
    }-${taskDeadline.getDate()}\n${
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

  return (
    <div className="min-h-[327px] max-w-[339px] w-full bg-[#ADA823] rounded-form-radius">
      <div className="m-4 flex items-start">
        <img className="w-[109px] h-[109px]" src={String(taskImage)} />
        <div className="mx-auto my-auto">
          <p className="text-xl text-center font-semibold">{taskName}</p>
          <p className="text-xl text-center text-red-800">
            {formatDate(taskDeadline)}
          </p>
        </div>
      </div>
      <div className="m-4 w-auto h-[107px] bg-white overflow-y-scroll">
        <p className="m-2 text-justify">{taskDescription}</p>
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
