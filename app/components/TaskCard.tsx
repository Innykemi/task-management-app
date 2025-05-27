"use client";

import { useDispatch } from "react-redux";
import { Task, deleteTaskThunk, updateTaskThunk } from "@/store/taskSlice";
import { AppDispatch } from "@/store";
import { useState } from "react";
import { TaskStatusBadge } from "./common/TaskStatusBadge";
import { icons } from "@/icons";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      await dispatch(
        updateTaskThunk({ ...task, completed: !task.completed })
      ).unwrap();
    } catch {
      alert("Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await dispatch(deleteTaskThunk(task.id)).unwrap();
    } catch {
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`relative group p-6 rounded-xl transition-transform shadow-md hover:scale-[1.02]
        bg-light text-dark dark:bg-dark dark:text-light flex flex-col justify-between gap-2 dark:shadow-hover`}
    >
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={toggleStatus}
          className="text-sm stroke-stroke hover:stroke-error disabled:opacity-50"
          disabled={loading}
          aria-label="edit task"
        >
          {icons.editIcon()}
        </button>
        <button
          onClick={handleDelete}
          className="text-sm stroke-stroke hover:stroke-error disabled:opacity-50"
          disabled={loading}
          aria-label="Delete task"
        >
          {icons.trashIcon()}
        </button>
      </div>

      <div className="space-y-1.5 mt-4">
        <h3 className="text-base font-semibold normal-case">{task.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.description || "No description provided."}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <TaskStatusBadge completed={task.completed} />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleStatus}
            className="text-sm underline text-primary cursor-pointer hover:opacity-80 disabled:opacity-50"
            disabled={loading}
            aria-label={
              task.completed ? "Mark as pending" : "Mark as completed"
            }
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </div>
      </div>
    </section>
  );
}
