import React, { useState } from "react";
import { GoGoal } from "react-icons/go";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    accepted: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.accepted)
      newErrors.accepted = "You must accept the terms and conditions";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.post("https://server-flax-nu.vercel.app/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Form Submitted",
          text: "User Created",
          showConfirmButton: true,
        });

        setForm({
          fullName: "",
          email: "",
          password: "",
          accepted: false,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        console.log("error");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email exists",
        text: "Please another one",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row w-full max-w-5xl mx-auto overflow-hidden">
        {/* Left Panel */}
        <div className="bg-violet-600 text-white px-6 py-8 sm:px-10 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GoGoal size={28} />
              <h2 className="text-2xl font-bold">Task Manager</h2>
            </div>
            <h2 className="text-2xl font-semibold mt-5">Get Things Done</h2>
            <h3 className="text-xl font-semibold mt-3">
              Join now to manage your tasks better. Plan, prioritize, and
              achieve more every day.
            </h3>
          </div>
          <p className="flex flex-wrap justify-center gap-2 text-sm text-white mt-6">
            Copyright © 2025 | Designed and Developed by{" "}
            <a href="https://myportflio-six.vercel.app/" target="_blank" rel="noopener noreferrer">
              <span className="font-semibold text-yellow-400">Manoj Kumar</span>
            </a>
          </p>
        </div>

        {/* Right Form Area */}
        <div className="p-6 sm:p-10 w-full md:w-1/2">
          <h1 className="text-lg md:text-xl lg:text-3xl font-bold">
            Create your To-Do list account
          </h1>
          <form className="space-y-4 lg:space-y-6 mt-6">
            <div>
              <label className="block text-lg font-semibold">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border-2 px-3 py-2 rounded mt-2 outline-none"
                type="text"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold">
                E-mail Address
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border-2 px-3 py-2 rounded mt-2 outline-none"
                type="text"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full border-2 px-3 py-2 rounded mt-2 outline-none"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                name="accepted"
                type="checkbox"
                checked={form.accepted}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                I accept the terms & conditions
              </span>
            </div>
            {errors.accepted && (
              <p className="text-red-500 text-sm">{errors.accepted}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full sm:w-auto px-10 lg:px-16 py-2 border-2 rounded text-base font-semibold bg-violet-600 text-white"
              >
                Sign Up
              </button>
              <Link to="/signin">
                <button
                  type="button"
                  className="w-full sm:w-auto px-10 lg:px-16 py-2 border-2 rounded text-base font-semibold bg-violet-600 text-white"
                >
                  Log In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
