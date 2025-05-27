import { Skeleton } from "antd";

export default function TaskSkeleton() {
  return (
    <section
      className={`relative group p-6 rounded-xl transition-transform shadow-md hover:scale-[1.02]
        bg-light text-dark dark:bg-dark dark:text-light flex flex-col justify-between gap-2 dark:shadow-primary`}
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <Skeleton paragraph={{ rows: 0 }} round style={{ width: "100%" }} />
      </div>

      <div className="space-y-1.5 mt-4 w-full">
        <div>
          <Skeleton paragraph={{ rows: 0 }} round />
        </div>
        <div>
          <Skeleton paragraph={{ rows: 0 }} round />
        </div>
      </div>
    </section>
  );
}
