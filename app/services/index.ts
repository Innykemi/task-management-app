import axios from 'axios';
import { Task } from '../store/taskSlice';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getTasks = () => api.get('/todos');
export const createTask = (task: Partial<Task>) => api.post('/todos', task);
export const updateTask = (id: number, updates: Partial<Task>) => api.patch(`/todos/${id}`, updates);
export const deleteTask = (id: number) => api.delete(`/todos/${id}`);

export default api;