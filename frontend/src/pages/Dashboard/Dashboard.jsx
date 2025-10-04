import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Tasks from "./Tasks";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../store/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex gap-6 p-6">
        <Sidebar />
        <main className="flex-1 bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <Tasks />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
