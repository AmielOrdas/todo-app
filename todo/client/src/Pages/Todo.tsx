import Navigation from "../Components/Navigation";
import TodoForm from "../Components/TodoForm";
import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

import "../index.css";

export default function Todo() {
  // const navigateTo = useNavigate();
  // const [suc, setSuc] = useState<any>();
  // axios.defaults.withCredentials = true;

  // For Protected Route
  // useEffect(() => {
  //   const verify = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/users/protected"
  //       );
  //       if (response.data === "Success") {
  //         setSuc("Success OK");
  //       } else {
  //         navigateTo("/signup");
  //       }
  //     } catch (error: any) {
  //       console.log(error.response.data.message);
  //     }
  //   };

  //   verify();
  // }, []);

  const [message, setMessage] = useState({
    messagePort: "",
  });

  // async function fetchMessage() {
  //   try {
  //     const response = await fetch("http://localhost:3000/newTodo", { method: "POST" }); // Fetch API will return a promise object that contains the HTTP response.

  //     if (!response.ok) {
  //       throw new Error("Could not fetch resource"); // This will execute when fetching fails
  //     }

  //     const messageResponse = await response.json(); // This will convert the body of the HTTP response from JSON to a JavaScript object.

  //     if (typeof messageResponse.message !== typeof message.messagePort) {
  //       throw new Error("Not equal");
  //     }

  //     setMessage({ messagePort: messageResponse.message });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchMessage();
  // }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[120px]">
        <div className="text-center">
          <TodoForm />
        </div>
        <h1>{message.messagePort}</h1>
      </main>
    </>
  );
}
