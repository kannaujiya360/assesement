import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormInput from "../../components/FormInput";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await dispatch(register(form)).unwrap();
      Swal.fire("Success", "Registered successfully", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", err?.message || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <FormInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
