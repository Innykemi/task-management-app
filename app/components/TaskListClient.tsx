"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchTasks } from "@/store/taskSlice";
import TaskList from "./TaskList";

export default function TaskListClient() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return <TaskList />;
}
