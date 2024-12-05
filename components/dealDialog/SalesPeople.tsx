import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import { salesPeople } from "./DealDialog";

const SalesPeople = ({
  selectedSalesperson,
  setSelectedSalesperson,
}: {
  selectedSalesperson: string;
  setSelectedSalesperson: Dispatch<SetStateAction<string>>;
}) => {

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">Sales person</Label>
      <Select
        value={selectedSalesperson}
        onValueChange={(value) => setSelectedSalesperson(value)}
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a sales person" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {salesPeople.map((person) => (
            <SelectItem key={person} value={person}>
              {person}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SalesPeople;
