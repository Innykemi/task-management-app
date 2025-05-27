"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store";
import { setTheme } from "../store/uiSlice";
import { icons } from "@/icons";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-[5px] bg-primary cursor-pointer hover:shadow-hover"
    >
      {theme ? icons.sunIcon() : icons.moonIcon()}
    </button>
  );
}
