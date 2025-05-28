import TaskCard from "@/components/TaskCard";
import { makeStore } from "@/store";
import { Task } from "@/store/taskSlice";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

global.alert = jest.fn();

jest.mock("@/icons", () => ({
  icons: {
    editIcon: () => <svg data-testid="edit-icon" />,
    trashIcon: () => <svg data-testid="trash-icon" />,
  },
}));

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "Test Description",
  completed: false,
  createdAt: new Date().toISOString(),
};

describe("TaskCard", () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
  });

  it("renders task details", () => {
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
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
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
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
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
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
