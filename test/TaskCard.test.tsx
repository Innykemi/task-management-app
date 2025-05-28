import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { Task } from "@/store/taskSlice";
import TaskCard from "@/components/TaskCard";
import { makeStore } from "@/store";

jest.mock("@/icons", () => ({
  icons: {
    editIcon: () => <svg data-testid="edit-icon" />,
    trashIcon: () => <svg data-testid="trash-icon" />,
  },
}));

const mockStore = makeStore();

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "Test Description",
  completed: false,
  createdAt: new Date().toISOString(),
};

describe("TaskCard", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
  });

  it("renders task details", () => {
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(
      screen.getByText(/No description provided/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Complete/i)).toBeInTheDocument();
  });

  it("shows edit and delete buttons on hover", async () => {
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    fireEvent.mouseOver(screen.getByLabelText("edit task"));
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });

  it("calls updateTaskThunk when toggling status", async () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Complete"));
    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining("tasks/update"),
        })
      )
    );
  });

  it("calls deleteTaskThunk when deleting", async () => {
    store.dispatch = jest.fn();
    window.confirm = jest.fn(() => true); // Always confirm
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    fireEvent.click(screen.getByLabelText("Delete task"));
    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining("tasks/delete"),
        })
      )
    );
  });

  it("opens edit modal when edit button is clicked", () => {
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    fireEvent.click(screen.getByLabelText("edit task"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
