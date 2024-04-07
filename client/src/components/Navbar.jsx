import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-fit h-fit px-2 py-2 rounded-lg bg-white flex items-center justify-center font-bold shadow-md"
      >
        {/* Initials */}
        <p className="blue-gradient_text">Home</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          Profile
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
