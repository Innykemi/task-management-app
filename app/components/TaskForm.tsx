"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  createTaskThunk,
  updateTaskThunk,
  addTaskOptimistic,
  removeTask,
  updateTaskOptimistic,
  Task,
} from "@/store/taskSlice";

interface TaskFormProps {
  initialData?: Task;
  onSuccess?: () => void;
}

export default function TaskForm({ initialData, onSuccess }: TaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(initialData?.completed ?? false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setCompleted(initialData.completed);
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
        const updatedTask = { ...initialData, title, description, completed };
        dispatch(updateTaskOptimistic(updatedTask));
        await dispatch(updateTaskThunk(updatedTask)).unwrap();
      } else {
        const tempId = Math.floor(Math.random() * 10000);
        const newTask = {
          id: tempId,
          title,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        dispatch(addTaskOptimistic(newTask));
        await dispatch(
          createTaskThunk({
            id: tempId,
            title,
            description,
            completed: false,
            createdAt: newTask.createdAt,
          })
        ).unwrap();
      }

      setTitle("");
      setDescription("");
      setCompleted(false);
      onSuccess?.();
    } catch {
      if (!initialData) {
        // Rollback optimistic add if create failed
        dispatch(removeTask(Date.now()));
      }
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
      {initialData && (
        <select
          aria-label="Status"
          value={completed ? "completed" : "pending"}
          onChange={(e) => setCompleted(e.target.value === "completed")}
          className="input-base"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      )}
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
