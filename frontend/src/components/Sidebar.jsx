import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white shadow-sm p-4">
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link></li>
        <li><Link to="/tasks" className="block p-2 rounded hover:bg-gray-100">Tasks</Link></li>
        <li><Link to="/profile" className="block p-2 rounded hover:bg-gray-100">Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
