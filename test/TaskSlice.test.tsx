import taskReducer, { fetchTasks, Task } from "@/store/taskSlice";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Test Task",
    description: "Test Desc",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/todos", () => {
    return HttpResponse.json(mockTasks, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("taskSlice", () => {
  it("should fetch tasks and update state correctly", async () => {
    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

    await store.dispatch(fetchTasks());

    const state = store.getState().tasks;

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe("Test Task");
  });
});
