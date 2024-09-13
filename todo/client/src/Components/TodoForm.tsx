import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";

export default function TodoForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  async function SubmitData(data: FieldValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // try {
    //   const response = await fetch("http://localhost:3000/newTodo", { method: "POST" }); // Fetch API will return a promise object that contains the HTTP response.
    //   if (!response.ok) {
    //     throw new Error("Could not fetch response"); // This will execute when fetching fails
    //   }
    //   const messageResponse = await response.json(); // This will convert the body of the HTTP response from JSON to a JavaScript object.
    // } catch (error) {
    //   console.error(error);
    // }
    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(SubmitData)}
      className="inline-block min-h-[530px] max-w-[421px] w-full bg-form-color rounded-form-radius text-center"
    >
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[30.89px]">
        <h1 className="text-left mb-[9px]">Task Name</h1>
        <input
          {...register("TaskName", { required: "Task Name is required" })}
          type="text"
          placeholder={
            !errors.TaskName ? "Enter Task Name" : (errors.TaskName.message as string)
          }
          className={
            !errors.TaskName
              ? "w-[349px] h-[27px] bg-input-green placeholder-black"
              : "w-[349px] h-[27px] bg-input-green placeholder-red-600"
          }
        />
      </div>
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">
          Task Deadline{" "}
          {errors.TaskDate && (
            <label className="text-red-600">{errors.TaskDate.message as string}</label>
          )}
        </h1>
        <input
          type="date"
          {...register("TaskDate", { required: "(Required)" })}
          className="w-[349px] h-[27px] bg-input-green"
        />
      </div>

      <div className=" w-[349px]  mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">Task Description</h1>
        <textarea
          {...register("TaskName")}
          placeholder="Enter Task Description (Optional) "
          className="w-[348.83px] h-[154.45px] bg-input-green"
        />
      </div>
      <div className="w-[142.84px] h-[56px] ml-[37px] mt-[15px] text-left">
        <h1 className="text-left mb-[5px]">Task Image</h1>
        <input type="file" {...register("TaskImage")} className="text-left w-[123px]" />
      </div>
      <div className="text-left ml-[37px] mt-[30px]">
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-[12px] bg-button-red w-[64px] h-[25.08px]  disabled:opacity-75"
        >
          Submit {`${isSubmitting}`}
        </button>
      </div>
    </form>
  );
}
