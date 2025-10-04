import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="font-bold text-lg">MyApp</Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
          <Link to="/profile" className="text-gray-700 hover:text-gray-900">Profile</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
