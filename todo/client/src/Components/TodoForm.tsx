import { useForm } from "react-hook-form"; // react-hook-form is a library used to create forms easily.
import { useEffect, useRef } from "react";
import {
  TnewTaskSchemaClient,
  ZnewTaskSchemaClient,
  TTaskImage,
} from "../../../lib/types";

import { zodResolver } from "@hookform/resolvers/zod"; // zodResolver is used to connect the zod schema and the react-hook-form
import axios from "axios"; // Axios is a HTTP request library

export default function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    trigger,
    resetField,
  } = useForm<TnewTaskSchemaClient>({
    resolver: zodResolver(ZnewTaskSchemaClient), // This means that useForm will use the newTaskSchemaClient zod schema to validate the form data.
  });
  const previousError = useRef<string | undefined>(undefined);
  // const [taskImage, setTaskImage] = useState<TTaskImage>(undefined)
  const taskImage: TTaskImage = watch("TaskImage");

  async function SubmitData(data: TnewTaskSchemaClient) {
    const formData = new FormData(); // This line of code allows us to send files to the server. Without this, we can only send string or numerical values (text, dates, age, email)

    // Attach the form data of the user to the formData variable.
    formData.append("TaskName", data.TaskName);
    formData.append("TaskDeadline", data.TaskDeadline);
    formData.append("TaskDescription", data.TaskDescription);

    // Check if the file is only a single file
    if (data.TaskImage instanceof File) {
      formData.append("TaskImage", data.TaskImage);
      // Check if the file is an array containing files
    } else if (data.TaskImage instanceof FileList) {
      formData.append("TaskImage", data.TaskImage[0]); // Attach the first file only because we only asked one single image.
    }

    try {
      await axios.post("http://localhost:3000/tasks", formData, {
        withCredentials: true,
      });
      alert("Successfully submitted");
    } catch (error: any) {
      alert(`Server error`);
      console.error(error.response.data.message);
    }
    reset();
  }

  useEffect(() => {
    if (errors.TaskImage) {
      previousError.current = errors.TaskImage.message; // Put the current error in the ref variable

      resetField("TaskImage"); // Reset the file input but not the error.
      trigger("TaskImage"); // Revalidate the input
    } else if (!errors.TaskImage && previousError.current) {
      previousError.current = ""; // Clear the previous error
    }
  }, [errors.TaskImage]);

  return (
    <form
      onSubmit={handleSubmit(SubmitData)}
      className="inline-block min-h-[530px] max-w-[421px] w-full bg-form-color rounded-form-radius text-center"
    >
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[30.89px]">
        <h1 className="text-left mb-[9px]">
          Task Name <label className="font-bold ">*</label>{" "}
          {errors.TaskName && (
            <label className="text-red-600 italic text-sm">{`(${errors.TaskName.message})`}</label>
          )}
        </h1>
        <input
          {...register("TaskName")}
          type="text"
          placeholder="Enter Task Name"
          className={
            !errors.TaskName
              ? "w-[349px] h-[27px] bg-input-green placeholder:italic placeholder:text-slate-500"
              : "w-[349px] h-[27px] bg-input-green placeholder:italic placeholder:text-red-600"
          }
        />
      </div>
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">
          Task Deadline <label className="font-bold">*</label>
          {errors.TaskDeadline && (
            <label className="text-red-600 italic text-sm">
              {` (${errors.TaskDeadline.message as string})`}
            </label>
          )}
        </h1>
        <input
          type="datetime-local"
          {...register("TaskDeadline")}
          className="w-[349px] h-[27px] bg-input-green"
        />
      </div>
      <div className=" w-[349px]  mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">Task Description</h1>
        <textarea
          {...register("TaskDescription")}
          placeholder="Enter Task Description"
          className="w-[348.83px] h-[154.45px] bg-input-green placeholder:italic placeholder:text-slate-500 resize-none"
        />
      </div>

      <div className="w-[300px] ml-[37px] text-left text-xs">
        {/*Check if its a single file */}
        {taskImage instanceof File && <p>{taskImage.name}</p>}
        {/*Check if its multiple files */}
        {taskImage instanceof FileList && taskImage.length > 0 && (
          <p>{taskImage[0].name}</p>
        )}
        {/*Check if file exists */}
        {!taskImage && !previousError.current ? (
          <p>No file selected</p>
        ) : (
          <>
            {/* Show error message if there's an error */}
            {previousError.current && (
              <p className="inline text-red-600 italic">
                {`Please select the correct file (${previousError.current})`}
              </p>
            )}
          </>
        )}
      </div>

      <div className="w-[165.84px] h-[56px] ml-[37px] mt-[15px] text-left">
        <label className="bg-blue-400 px-4 py-2 border-0 font-semibold text-white text-center rounded-full cursor-pointer hover:bg-blue-800">
          Choose Image
          <input type="file" {...register("TaskImage")} className="hidden" />
        </label>
      </div>
      <div className="text-left ml-[37px] ">
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-[12px] bg-button-red w-[64px] h-[25.08px]  disabled:opacity-75"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
