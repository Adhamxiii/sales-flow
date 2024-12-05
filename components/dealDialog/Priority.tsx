import { SaleType } from "@/app/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { SalePriority } from "../../app/types";

const Priority = ({
  selectedPriority,
  setSelectedPriority,
}: {
  selectedPriority: SalePriority;
  setSelectedPriority: Dispatch<SetStateAction<SalePriority>>;
}) => {
  const priority = [
    { value: "Low", bgColor: "bg-green-500" },
    { value: "Medium", bgColor: "bg-yellow-500" },
    { value: "High", bgColor: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">Status</Label>
      <Select
        value={selectedPriority}
        onValueChange={(value) =>
          setSelectedPriority(value as SaleType["priority"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a diagnosis" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {priority.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              <div className="flex items-center gap-2">
                <div className={`${p.bgColor} rounded-lg h-4 w-4`} />
                <span>{p.value}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Priority;
