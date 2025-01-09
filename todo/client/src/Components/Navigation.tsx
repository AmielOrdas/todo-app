import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_fixed.png";
export default function Navigation() {
  const navigateTo = useNavigate();

  const HandleSignout = async () => {
    // Call Signout Route
    try {
      // Set credential to true to allow cookie in req
      const response = await fetch("http://localhost:3000/users/signout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Could not fetch response");
      }
      const messageResponse = await response.json();
      console.log(messageResponse.message);
      console.log("Signed out successfully");
      // Navigate to Login Page After Signing Out
      navigateTo("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="bg-nav-bar-color p-2">
      <nav className="flex justify-between">
        <img src={logo} className="xl:ml-[150px] lg:size-20 sm:size-40" />
        <div className="lg:flex justify-between items-center">
          <ul className="lg:flex justify-between items-center">
            <li className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold">
              <Link to="/Todo">Todo</Link>
            </li>
            <li className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold">
              <Link to="/pending-tasks">Task Pending List</Link>
            </li>

            <li className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold">
              <Link to="/finished-tasks">Task Finished List</Link>
            </li>
          </ul>
          <button
            className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold"
            onClick={HandleSignout}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
}
