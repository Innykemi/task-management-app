import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import taskReducer from "./taskSlice";
import uiReducer from "./uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      tasks: taskReducer,
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
