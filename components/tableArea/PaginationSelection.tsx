import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationType } from "./TableArea";

const PaginationSelection = ({
  pagination,
  setPagination,
}: {
  pagination: PaginationType;
  setPagination: Dispatch<SetStateAction<PaginationType>>;
}) => {
  return (
    <div className="flex items-center gap-2 max-sm:flex-col">
      <span className="text-sm text-gray-500">Rows per page</span>
      <Select
        value={pagination.pageSize.toString()}
        onValueChange={(value) =>
          setPagination({ ...pagination, pageSize: parseInt(value) })
        }
      >
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder={pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaginationSelection;
