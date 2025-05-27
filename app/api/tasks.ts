import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Task } from '@/store/taskSlice';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET': {
        const response = await axios.get(BASE_URL);
        const data = response.data.slice(0, 20).map((todo: Task) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          description: 'Mock task description',
          createdAt: new Date().toISOString(),
        }));
        res.status(200).json(data);
        break;
      }
      case 'POST': {
        const response = await axios.post(BASE_URL, req.body);
        const task = {
          ...response.data,
          id: Math.floor(Math.random() * 10000),
          createdAt: new Date().toISOString(),
        };
        res.status(201).json(task);
        break;
      }
      case 'PATCH': {
        const response = await axios.patch(`${BASE_URL}/${id}`, req.body);
        res.status(200).json(response.data);
        break;
      }
      case 'DELETE': {
        await axios.delete(`${BASE_URL}/${id}`);
        res.status(200).json({ message: 'Deleted', id });
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}