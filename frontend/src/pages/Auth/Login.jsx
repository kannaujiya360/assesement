import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormInput from "../../components/FormInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login(form)).unwrap();
      Swal.fire("Success", "Logged in", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", err?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <FormInput label="Password" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">Login</button>
        </form>
        <p className="text-sm mt-3">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
