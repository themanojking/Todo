import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://server-flax-nu.vercel.app/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    if (!task.trim()) return;
    try {
      const res = await axios.post(
        "https://server-flax-nu.vercel.app/tasks",
        { rec_text: task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevtask) => [...prevtask, res.data]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://server-flax-nu.vercel.app/tasks/${id}`);
      setTasks(tasks.filter((t) => t.rec_id !== id));
    } catch (error) {
      console.error("Error deleting task :", error);
    }
  };

  const handleStatusTask = async (id) => {
    try {
      const res = await axios.put(`https://server-flax-nu.vercel.app/tasks/${id}/status`);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.rec_id == id ? res.data : task))
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 px-4">
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl w-full max-w-xl p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>
          <div className="relative flex items-center mb-8">
            <input
              type="text"
              value={task}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleAddTask();
                }
              }}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What would you like to do?"
              className="w-full border-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-700
               placeholder:text-gray-400 text-lg font-medium border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <IoMdAddCircle
              onClick={handleAddTask}
              size={34}
              className="absolute right-4 text-white bg-violet-500 rounded-full p-1 cursor-pointer shadow-md hover:bg-violet-700 transition"
            />
          </div>
          <div className="flex justify-around px-4 text-lg text-gray-400 mb-2 font-semibold">
            <div>Task</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div
                key={t.rec_id}
                className="flex flex-row justify-around items-center text-center bg-gray-600 p-3  rounded-lg"
              >
                <span
                  className={`w-1/3 ${
                    t.rec_status ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.rec_text}
                </span>
                <span className="w-1/3">
                  <button
                    onClick={() => handleStatusTask(t.rec_id)}
                    className={`px-3 py-2 rounded ${
                      t.rec_status
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {t.rec_status ? "completed" : "pending"}
                  </button>
                </span>
                <span className="w-1/3">
                  <button
                    onClick={() => handleDeleteTask(t.rec_id)}
                    className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 "
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="flex flex-wrap justify-center gap-2 text-sm text-white mt-6">
          Copyright © 2025 | Designed and Developed by{" "}
          <a href="https://myportflio-six.vercel.app/" target="_blank">
            <span className="font-semibold text-yellow-400">Manoj Kumar</span>
          </a>
        </p>
      </div>
    </>
  );
}

export default Todo;
