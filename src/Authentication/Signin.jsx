import React from "react";
import { GoGoal } from "react-icons/go";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const response = await axios.post("https://server-flax-nu.vercel.app/login", {
        email: form.email,
        password: form.password,
      });
      if (response.status == 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        Swal.fire({
          position: "center",
          icon: "success",
          text: "Login Successfully",
          showConfirmButton: true,
        });
        setForm({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/todo");
        }, 3000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Email or Password is invalid",
        title: "Error",
        timer: 3000,
        timerProgressBar: true,
      });
      console.log("error :", error.message);
    }
  };
  return (
    <>
      <div className="flex  justify-center items-center min-h-screen bg-gray-100 px-4 ">
        <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row max-w-6xl w-full overflow-hidden">
          <div className="bg-violet-600 text-white p-8 sm:p-10 w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <GoGoal size={28} />
                <h2 className="text-2xl font-bold">Task Master</h2>
              </div>
              <h2 className="text-2xl font-semibold mt-5">Stay Organized</h2>

              <h3 className="text-xl font-semibold mt-3">
                Manage your daily tasks efficiently. Plan, prioritize, and track
                your to-dos effortlessly.
              </h3>
            </div>
            <p className="flex flex-wrap justify-center gap-2 text-sm text-white mt-6">
              Copyright © 2025 | Designed and Developed by{" "}
              <a
                href="https://myportflio-six.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold text-yellow-400">
                  Manoj Kumar
                </span>
              </a>
            </p>
          </div>

          {/* input area */}
          <div className="p-6 sm:p-10 w-full md:w-1/2">
            <h1 className="text-lg md:text-xl lg:text-3xl font-bold">
              Sign in to your To-Do List
            </h1>
            <form className="space-y-3 lg:space-y-10 mt-5 md:mt-10">
              <div>
                <label className="block text-xl font-semibold">
                  E-mail Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-2 pr-10 pl-2 py-2 rounded mt-2"
                  type="text"
                  required
                ></input>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="">
                <label className="block text-xl font-semibold">Password</label>
                <div className="relative w-full">
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 pr-10 pl-2 py-2 rounded mt-2"
                    required
                  ></input>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/4 cursor-pointer"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash size={24} />
                    ) : (
                      <FaRegEye size={24} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 ">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full sm:w-auto px-10 lg:px-16  py-2 border-2 rounded text-base font-semibold bg-violet-600 text-white"
                >
                  Sign In
                </button>
                <Link to="/">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-10 lg:px-16  py-2 border-2 rounded text-base font-semibold bg-violet-600 text-white"
                  >
                    Create Account
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
