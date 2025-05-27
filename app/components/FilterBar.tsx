"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import React from "react";
import { icons } from "@/icons";
import { setFilter, setSearch } from "@/store/uiSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { filter, search } = useSelector((state: RootState) => state.ui);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="relative w-full">
        <input
          id="taskTitle"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full py-2 px-3 border-b border-primary text-primary-light dark:bg-dark dark:text-light focus:border-blue-500 focus:outline-none"
          aria-label="Search tasks"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {icons.searchIcon()}
        </div>
      </div>
      <select
        value={filter}
        onChange={(e) =>
          dispatch(setFilter(e.target.value as "all" | "pending" | "completed"))
        }
        className="p-2 border-none rounded bg-primary text-light uppercase shadow-primary outline-none"
        aria-label="Filter by status"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
