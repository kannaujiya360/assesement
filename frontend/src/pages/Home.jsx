
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Assignment App</h1>
        <p className="mb-6">A simple MERN/Tailwind demo for the internship task</p>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-gray-200 rounded">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
