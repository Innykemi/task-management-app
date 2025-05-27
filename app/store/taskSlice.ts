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
  loading: boolean
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await getTasks();
  return res.data;
});

export const createTaskThunk = createAsyncThunk('tasks/create', async (task: Partial<Task>) => {
  const res = await createTask({ ...task, completed: false })
  return res.data
})

export const updateTaskThunk = createAsyncThunk('tasks/update', async (task: Task) => {
  const res = await updateTask(task.id, task)
  return res.data
})

export const deleteTaskThunk = createAsyncThunk('tasks/delete', async (id: number) => {
  await deleteTask(id)
  return id
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
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
      .addCase(createTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex(t => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(task => task.id !== action.payload)
      })
  },
});

export default taskSlice.reducer;