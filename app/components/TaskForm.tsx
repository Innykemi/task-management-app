"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createTaskThunk } from "@/store/taskSlice";

export default function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length > 100) {
      alert("Title is required and must be under 100 characters");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createTaskThunk({ title, description })).unwrap();
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full p-2 border rounded dark:bg-gray-700"
        maxLength={100}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description (optional)"
        className="w-full p-2 border rounded dark:bg-gray-700"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
