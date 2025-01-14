import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/logo_fixed.png";
import "../index.css";
import { useForm } from "react-hook-form";
import { TloginSignupSchema, ZsignupSchema } from "../../../lib/types";
import NavigateAuthentication from "../Components/NavigateAuthentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function Signup() {
  // Setup Schema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TloginSignupSchema>({
    resolver: zodResolver(ZsignupSchema),
  });

  // Apply useEffect to change title page
  useEffect(() => {
    document.title = "Sign Up | Todo";
    const token = Cookies.get("token");
    // Navigate to Login Page if no token in cookies
    if (token) {
      navigateTo("/Todo");
    }
  }, []);

  const navigateTo = useNavigate();

  // Handle Sign Up Submission to Server After Validation
  async function HandleSignup(data: TloginSignupSchema) {
    try {
      const response = await axios.post("http://localhost:3000/users/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.Status === "Success") {
        // Reset
        reset();
        // Navigate to Login Page After Account Creation
        navigateTo("/login");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Get Status and Error Response
        const status: number = error.response.status;
        const serverErrorMessage: string = error.response.data.error;
        // Set Whichever Error Received from Server
        if (status === 409) {
          setError("email", { type: "server", message: serverErrorMessage });
        } else {
          setError("root", {
            type: "server",
            message: "Unexpected error occurred",
          });
        }
      }
    }
  }

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
          <h1 className="text-center pt-2 text-2xl font-semibold">Sign Up Account</h1>
          <form onSubmit={handleSubmit(HandleSignup)}>
            <div className="m-4">
              <h1 className="text-lg">
                Username{" "}
                {errors.userName && (
                  <label className="text-red-600 italic text-sm">{` (${errors.userName.message})`}</label>
                )}
              </h1>
              <input
                {...register("userName")}
                className={
                  !errors.email
                    ? "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-slate-500"
                    : "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-red-500"
                }
                type="text"
                placeholder="  Enter username"
              />
            </div>{" "}
            <div className="m-4">
              <h1 className="text-lg">
                Email{" "}
                {errors.email && (
                  <label className="text-red-600 italic text-sm">{` (${errors.email.message})`}</label>
                )}
              </h1>
              <input
                {...register("email")}
                className={
                  !errors.email
                    ? "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-slate-500"
                    : "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-red-500"
                }
                type="email"
                placeholder="  Enter email"
              />
            </div>
            <div className="m-4">
              <h1 className="text-lg">
                Password{" "}
                {errors.password && (
                  <label className="text-red-600 italic text-sm">{` (${errors.password.message})`}</label>
                )}
              </h1>
              <input
                {...register("password")}
                className={
                  !errors.password
                    ? "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-slate-500"
                    : "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-red-500"
                }
                type="password"
                placeholder="  Enter password"
              />
            </div>
            <div className="m-4">
              <h1 className="text-lg">
                Confirm Password{" "}
                {errors.confirmPassword && (
                  <label className="text-red-600 italic text-sm">{` (${errors.confirmPassword.message})`}</label>
                )}
              </h1>
              <input
                {...register("confirmPassword")}
                className={
                  !errors.confirmPassword
                    ? "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-slate-500"
                    : "text-lg bg-input-green w-full rounded placeholder:italic placeholder:text-red-500"
                }
                type="password"
                placeholder="  Confirm password"
              />
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
