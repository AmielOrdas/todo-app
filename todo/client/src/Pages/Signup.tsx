import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/logo_fixed.png";
import "../index.css";
import { useForm } from "react-hook-form";
import { TloginSignupSchema, ZsignupSchema } from "../../../lib/types";
import NavigateAuthentication from "../Components/NavigateAuthentication";

export default function Signup() {
  // Setup Schema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginSignupSchema>({
    resolver: zodResolver(ZsignupSchema),
  });

  // Handle Sign Up Submission to Server After Validation
  const ToggleSignup = async (data: TloginSignupSchema) => {
    // Insert Submission to Server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  return (
    <main className="min-h-screen bg-background-color-main">
      <NavigateAuthentication />
      <div className="w-full flex justify-center">
        <div className="flex mt-8">
          <img src={logo} className="h-[142px] w-[167px] mr-3" />
          <h1 className="my-auto text-3xl font-semibold">To-do App</h1>
        </div>
      </div>
      <div className="mt-8">
        <div className="min-h-auto max-w-[421px] bg-form-color rounded-form-radius mx-auto my-auto border-black border-2">
          <h1 className="text-center pt-2 text-2xl font-semibold">
            Sign Up Account
          </h1>
          <form onSubmit={handleSubmit(ToggleSignup)}>
            <div className="m-4">
              <h1 className="text-lg">Email:</h1>
              <input
                {...register("email")}
                className="text-lg bg-input-green w-full rounded"
                type="email"
                placeholder="  Enter email"
              />
              {errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
              )}
            </div>
            <div className="m-4">
              <h1 className="text-lg">Password:</h1>
              <input
                {...register("password")}
                className="text-lg bg-input-green w-full rounded"
                type="password"
                placeholder="  Enter password"
              />
              {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
              )}
            </div>
            <div className="m-4">
              <h1 className="text-lg">Confirm Password:</h1>
              <input
                {...register("confirmPassword")}
                className="text-lg bg-input-green w-full rounded"
                type="password"
                placeholder="  Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
              )}
            </div>
            <div className="flex justify-around pt-2 pb-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="hover:bg-red-900 bg-button-red p-2 rounded-xl font-semibold disabled:bg-red-900"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
