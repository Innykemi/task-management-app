export function TaskStatusBadge({ completed }: { completed: boolean }) {
  return (
    <span
      className={`p-1 rounded-lg text-xs uppercase tracking-wider font-semibold w-fit
        ${
          completed
            ? "border border-primary bg-primary/20 dark:bg-primary/30 text-primary dark:text-light"
            : "border border-yellow-500 bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200"
        }`}
    >
      {completed ? "Completed" : "Pending"}
    </span>
  );
}
