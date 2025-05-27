'use client'

import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useMemo } from 'react'
import { Task } from '@/store/taskSlice'
import { getTasks } from '@/services'

const url = process.env.API_URL;

function useTasks() {
  const fetcher = async (): Promise<Task[]> => {
    const response = await getTasks();
    return response?.data;
  };

  const { data, error, isLoading } = useSWR<Task[]>(`${url}/todos`, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true
  })

  const { filter, search } = useSelector((state: RootState) => state.ui)

  const tasks = useMemo(() => {
    if (!data) return []
    return data
      .filter(task => {
        if (filter === 'pending') return !task.completed
        if (filter === 'completed') return task.completed
        return true
      })
      .filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
  }, [data, filter, search])

  return {
    tasks,
    loading: isLoading,
    error
  }
}

export default useTasks;
