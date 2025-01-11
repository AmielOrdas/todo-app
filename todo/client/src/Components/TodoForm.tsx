import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  TnewTaskSchemaClient,
  ZnewTaskSchemaClient,
  TTaskImage,
} from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<TnewTaskSchemaClient>({
    resolver: zodResolver(ZnewTaskSchemaClient),
  });
  const fileRef = useRef<TTaskImage>(undefined);
  const taskImage: TTaskImage = watch("TaskImage");

  async function SubmitData(data: TnewTaskSchemaClient) {
    const formData = new FormData();
    formData.append("TaskName", data.TaskName);
    formData.append("TaskDeadline", data.TaskDeadline);
    formData.append("TaskDescription", data.TaskDescription);

    if (data.TaskImage instanceof File) {
      formData.append("TaskImage", data.TaskImage);
    } else if (data.TaskImage instanceof FileList) {
      formData.append("TaskImage", data.TaskImage[0]);
    }

    try {
      await axios.post("http://localhost:3000/tasks", formData, {
        withCredentials: true,
      });
    } catch (error: any) {
      console.error(error.response.data.message);
    }

    reset();
  }

  function CheckFileInput(value: TTaskImage) {
    if (value instanceof FileList) {
      const fileList: FileList = value;
      if (fileList.length > 0) {
        return fileList[0].name;
      } else if (fileList.length === 0) {
        if (fileRef.current != undefined) {
          setValue("TaskImage", fileRef.current);
          return "No file chosen";
        }
      }
    } else if (value instanceof File) {
      const file: File = value;

      return file.name;
    } else if (!value) {
      return "No file chosen";
    }
  }

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

      <div className="w-[190px] ml-[37px] text-left text-xs">
        {errors.TaskImage ? (
          <p className="text-red-600">{errors.TaskImage.message}</p>
        ) : (
          <p>{CheckFileInput(taskImage)}</p>
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
