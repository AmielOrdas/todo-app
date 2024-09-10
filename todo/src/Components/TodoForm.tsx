export default function TodoForm() {
  return (
    <form className="inline-block min-h-[530px] max-w-[421px] w-full bg-form-color rounded-form-radius text-center">
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[30.89px]">
        <h1 className="text-left mb-[9px]">Task Name</h1>
        <input type="text" className="w-[349px] h-[27px] bg-input-green" />
      </div>
      <div className=" w-[349px] h-[51.11px] mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">Task Deadline</h1>
        <input type="text" className="w-[349px] h-[27px] bg-input-green" />
      </div>
      <div className=" w-[349px]  mx-auto mt-[15px]">
        <h1 className="text-left mb-[9px]">Task Description</h1>
        <textarea className="w-[348.83px] h-[154.45px] bg-input-green" />
      </div>
      <div className="w-[142.84px] h-[56px] ml-[37px] mt-[15px] text-left">
        <h1 className="text-left mb-[5px]">Task Image</h1>
        <input type="text" className="text-left w-[123px] bg-input-green" />
      </div>
      <div className="text-left ml-[37px] mt-[30px]">
        <button className="text-[12px] bg-button-red w-[64px] h-[25.08px] ">
          Submit
        </button>
      </div>
    </form>
  );
}
