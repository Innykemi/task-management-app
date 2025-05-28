import { createTask, deleteTask, getTasks, updateTask } from '@/services';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await getTasks();
  return res.data;
});

export const createTaskThunk = createAsyncThunk(
  'tasks/create',
  async (task: Task, { rejectWithValue }) => {
    try {
      const response = await createTask(task);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/update',
  async (task: Task, { rejectWithValue }) => {
    try {
      const res = await updateTask(task.id, task);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskOptimistic(state, action: PayloadAction<Task>) {
      state.items.unshift(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    updateTaskOptimistic(state, action: PayloadAction<Task>) {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteTaskOptimistic(state, action: PayloadAction<number>) {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Create task (API response)
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const idx = state.items.findIndex(
          t => t.title === action.payload.title && t.createdAt === action.payload.createdAt
        );
        if (idx !== -1) {
          state.items[idx] = {
            ...state.items[idx],
            ...action.payload,
            id: state.items[idx].id,
          };
        } else {
          state.items.unshift({
            ...action.payload,
            id: Math.floor(Math.random() * 10000),
          });
        }
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      // Update task (API response)
      .addCase(updateTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update task';
      })
      // Delete task (API response)
      .addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const {
  addTaskOptimistic,
  removeTask,
  updateTaskOptimistic,
  deleteTaskOptimistic,
} = taskSlice.actions;

export default taskSlice.reducer;