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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-color-main pt-[120px]">
        <div className="text-center">
          <TodoForm />
        </div>
      </main>
    </>
  );
}
