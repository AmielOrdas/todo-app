import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Navigation() {
  return (
    <header className="bg-nav-bar-color p-2">
      <nav className="flex justify-between">
        <img src={logo} className="xl:ml-[150px] lg:size-20 sm:size-40" />
        <ul className="lg:flex justify-between items-center">
          <li className="text-[24px] text-nav-bar-font-color px-8 max-lg: pb-1">
            <Link to="/">Todo</Link>
          </li>
          <li className="text-[24px] text-nav-bar-font-color px-8 max-lg: py-1">
            <h3>Task Pending List</h3>
          </li>

          <li className="text-[24px] text-nav-bar-font-color px-8 max-lg: py-1">
            <Link to="/finished-tasks">Task Finished List</Link>
          </li>
          <li className="text-[24px] text-nav-bar-font-color px-8 max-lg: pb-1">
            <h3>Login</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
