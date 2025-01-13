import React from "react";
import Navigation from "../Components/Navigation";
import logo from "../assets/logo_fixed.png";
export default function NotFound() {
  document.title = "404 Not Found";
  return (
    <main className="min-h-screen bg-background-color-main">
      <div className="flex h-screen justify-center items-center">
        <img src={logo} className="h-[142px] w-[167px] mr-3" />
        <h1 className="my-auto text-3xl font-semibold text-red-700">
          404 Page Not found
        </h1>
      </div>
    </main>
  );
}
