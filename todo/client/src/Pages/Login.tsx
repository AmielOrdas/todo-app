import logo from "../assets/logo_fixed.png";
import "../index.css";

export default function Login() {
  // function ToggleLogin()
  // function ToggleSignup()
  return (
    <main className="min-h-screen bg-background-color-main">
      <div className="w-full flex justify-center">
        <div className="flex mt-8">
          <img src={logo} className="h-[142px] w-[167px] mr-3" />
          <h1 className="my-auto text-3xl font-semibold">To-do App</h1>
        </div>
      </div>
      <div className="mt-8">
        <div className="min-h-auto max-w-[421px] bg-form-color rounded-form-radius mx-auto my-auto border-black border-2">
          <h1 className="text-center pt-2 text-2xl font-semibold">
            Login / Sign up
          </h1>
          <div className="m-4">
            <h1 className="text-lg">Email:</h1>
            <input
              className="text-lg bg-input-green w-full rounded"
              type="email"
              placeholder="  Enter email"
            />
          </div>
          <div className="m-4">
            <h1 className="text-lg">Password:</h1>
            <input
              className="text-lg bg-input-green w-full rounded"
              type="password"
              placeholder="  Enter password"
            />
          </div>
          <div className="flex justify-around pt-2 pb-6">
            <button className="hover:bg-red-900 bg-button-red p-2 rounded-xl font-semibold">
              Login
            </button>
            <button className="hover:bg-red-900 bg-button-red p-2 rounded-xl font-semibold">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
