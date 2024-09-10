export default function TodoForm() {
  return (
    <form className="inline-block min-h-[530px] max-w-[421px] w-full bg-form-color rounded-form-radius text-center">
      <div>
        <h1>Task Name</h1>
        <input type="text" />
      </div>
      <div>
        <h1>Task Deadline</h1>
        <input type="text" />
      </div>
      <div>
        <h1>Task Description</h1>
        <textarea />
      </div>
      <span>
        <h1>Task Image</h1>
        <input type="text" />
      </span>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
