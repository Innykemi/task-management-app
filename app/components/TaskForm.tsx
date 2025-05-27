"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createTaskThunk, Task, updateTaskThunk } from "@/store/taskSlice";

interface TaskFormProps {
  initialData?: Task;
  onSuccess?: () => void;
}

export default function TaskForm({ initialData, onSuccess }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.length > 100) {
      alert("Title is required and must be under 100 characters");
      return;
    }

    setLoading(true);
    try {
      if (initialData) {
        await dispatch(
          updateTaskThunk({ ...initialData, title, description })
        ).unwrap();
      } else {
        await dispatch(
          createTaskThunk({
            title,
            description,
            createdAt: new Date().toISOString(),
          })
        ).unwrap();
      }

      setTitle("");
      setDescription("");
      onSuccess?.();
    } catch {
      alert("Something went wrong.");
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
        className="input-base"
        maxLength={100}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description (optional)"
        className="input-base"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? initialData
            ? "Updating..."
            : "Adding..."
          : initialData
          ? "Update Task"
          : "Add Task"}
      </button>
    </form>
  );
}
