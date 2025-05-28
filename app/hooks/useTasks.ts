'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useMemo } from 'react'

function useTasks() {
  const { items, loading, error } = useSelector((state: RootState) => state.tasks)
  const { filter, search } = useSelector((state: RootState) => state.ui)

  const tasks = useMemo(() => {
    return items
      .filter(task => {
        if (filter === 'pending') return !task.completed
        if (filter === 'completed') return task.completed
        return true
      })
      .filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
  }, [items, filter, search])

  return {
    tasks,
    loading,
    error
  }
}

export default useTasks;