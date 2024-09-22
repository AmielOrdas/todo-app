export default function PendingForm() {
  return (
    <div className="min-h-[327px] max-w-[339px] w-full bg-[#ADA823] rounded-form-radius">
      <div className="m-4 flex items-start">
        <div className="w-[109px] h-[109px] bg-white">
          <p className="text-center my-auto">Insert Image</p>
        </div>
        <div className="mx-auto my-auto">
          <p className="text-xl">Task Name</p>
          <p className="text-xl">Task Deadline</p>
        </div>
      </div>
      <div className="m-4 w-auto h-[107px] bg-white">
        <p>INSERT TASK DESCRIPTION</p>
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
