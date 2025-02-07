import { RecordsTable } from "./RecordsTable";

export const Stats = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[80%]">
        <RecordsTable />
      </div>
    </div>
  );
};
