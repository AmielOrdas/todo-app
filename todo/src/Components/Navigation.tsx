import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
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
