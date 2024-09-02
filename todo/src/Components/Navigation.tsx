import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header className="flex justify-between bg-gray-400 p-5 ">
      <nav>
        <ul>
          <li className="text-gray-600">
            <Link to="/">Todo</Link>
          </li>
          <li>
            <Link to="/finished-tasks">Task Finished List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
