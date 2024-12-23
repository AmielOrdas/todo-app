import { Link } from "react-router-dom";
import logo from "../assets/logo_fixed.png";
export default function NavigateAuthentication() {
  return (
    <header className="bg-nav-bar-color p-2">
      <nav className="flex justify-between">
        <img src={logo} className="xl:ml-[150px] lg:size-20 sm:size-40" />
        <ul className="lg:flex justify-between items-center">
          <li className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:bg-[#441D1D] text-[24px] text-nav-bar-font-color px-8 max-lg: py-1 hover:font-bold">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
