import React, { ReactNode } from "react";
import { Card } from "./ui/card";

const SingleStateCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) => {
  return (
    <Card className="flex flex-col gap-2 p-4 shadow-none">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-600">{title}</span>
        <div className="size-7 rounded-md flex items-center justify-center text-sm bg-primary/25 font-bold text-primary p-1.5">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </Card>
  );
};

export default SingleStateCard;
