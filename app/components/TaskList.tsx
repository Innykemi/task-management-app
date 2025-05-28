"use client";

import useTasks from "@/hooks/useTasks";
import TaskCard from "./TaskCard";
import Image from "next/image";
import TaskSkeleton from "./common/TaskSkeleton";

export default function TaskList() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(3)].map((_, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) return <p>Failed to load tasks.</p>;
  if (!loading && tasks?.length === 0)
    return (
      <div className="flex justify-center h-full ">
        <Image
          src="/images/not-found.svg"
          height={174}
          width={221}
          alt="no task found"
        />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {tasks?.map((task) => (
        <TaskCard key={task?.id} task={task} />
      ))}
    </div>
  );
}
