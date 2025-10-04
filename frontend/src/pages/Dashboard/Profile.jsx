import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/slices/authSlice";
import { updateProfile as updateProfileService } from "../../services/profileService";
import Swal from "sweetalert2";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (!user) dispatch(fetchProfile());
    else setForm({ name: user.name || "", email: user.email || "", password: "" });
  }, [dispatch, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const updated = await updateProfileService(payload);
      Swal.fire("Success", "Profile updated", "success");
      // update local user
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Update failed", "error");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex gap-6 p-6">
        <Sidebar />
        <main className="flex-1 bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <form onSubmit={handleUpdate} className="max-w-md">
            <label className="block mb-2">Name</label>
            <input className="border p-2 rounded w-full mb-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label className="block mb-2">Email</label>
            <input className="border p-2 rounded w-full mb-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label className="block mb-2">New Password (optional)</label>
            <input type="password" className="border p-2 rounded w-full mb-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
