import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/logo_fixed.png";
import "../index.css";
import { useForm } from "react-hook-form";
import { TloginSignupSchema, ZsignupSchema } from "../../../lib/types";
import NavigateAuthentication from "../Components/NavigateAuthentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigateTo = useNavigate();

  // Handle Sign Up Submission to Server After Validation
  async function HandleSignup(data: TloginSignupSchema) {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/signup",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data.message);

      if (response.data.Status === "Success") {
        // Navigate to Login Page After Account Creation
        navigateTo("/login");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
    reset();
  }

  // async function HandleSignup(data: TloginSignupSchema) {
  //   try {
  //     // Change url
  //     const response = await fetch("http://localhost:3000/users/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Could not fetch response");
  //     }
  //     const messageResponse = await response.json();
  //     console.log(messageResponse.message);
  //     console.log("Signup successful");
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   reset();
  // }

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
          <form onSubmit={handleSubmit(HandleSignup)}>
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
