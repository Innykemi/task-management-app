import Image from "next/image";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import dynamic from "next/dynamic";
import TaskSkeleton from "./components/common/TaskSkeleton";
import AddTaskButton from "./components/common/AddTaskButton";

const TaskListClient = dynamic(() => import("./components/TaskListClient"), {
  loading: () => <TaskSkeleton />,
});

function Home() {
  return (
    <main
      className="relative min-h-screen bg-light dark:bg-dark transition-colors duration-200 py-8 px-4 sm:px-6  motion-reduce:transition-none"
      role="main"
    >
      <section className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-2 space-y-1 flex items-center gap-2">
            <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
            <h1 className="text-3xl font-bold text-dark dark:text-light">
              Task Manager
            </h1>
          </div>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md motion-reduce:transition-none">
            <FilterBar />
          </div>

          <section>
            <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-700">
              <TaskListClient />
            </div>
          </section>
        </div>
        <AddTaskButton />
      </section>
    </main>
  );
}

export default Home;
