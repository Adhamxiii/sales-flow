import { SaleStatus, SaleType } from "@/app/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

const Status = ({
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: SaleStatus;
  setSelectedStatus: Dispatch<SetStateAction<SaleStatus>>;
}) => {
  const statues = ["In Progress", "Closed", "Negotiation", "Pending"];

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">Status</Label>
      <Select
        value={selectedStatus}
        onValueChange={(value) =>
          setSelectedStatus(value as SaleType["status"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a diagnosis" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {statues.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Status;
