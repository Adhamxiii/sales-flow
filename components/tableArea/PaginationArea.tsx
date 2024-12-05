"use client";

import { useTheme } from "next-themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PaginationSelection from "./PaginationSelection";
import { Button } from "../ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PaginationType } from "./TableArea";
import { Table } from "@tanstack/react-table";
import { SaleType } from "@/app/types";

const PaginationArea = ({
  table,
  pagination,
  setPagination,
}: {
  table: Table<SaleType>;
  pagination: PaginationType;
  setPagination: Dispatch<SetStateAction<PaginationType>>;
}) => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`relative w-full h-20 max-sm:h-[206px] max-sm:pt-4 max-sm:pb-4 overflow-hidden flex justify-between items-center px-6 ${bgColor} border-t max-sm:flex-col max-sm:gap-2`}
    >
      <PaginationSelection
        pagination={pagination}
        setPagination={setPagination}
      />
      <div className="flex items-center gap-6 max-sm:flex-col max-sm:mt-4 max-sm:gap-2">
        <span className="text-sm text-gray-500">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() =>
              setPagination({ pageIndex: 0, pageSize: pagination.pageSize })
            }
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronFirst />
          </Button>
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
              })
            }
            disabled={pagination.pageIndex === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
              })
            }
            disabled={pagination.pageIndex === table.getPageCount() - 1}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            onClick={() =>
              setPagination({
                pageIndex: table.getPageCount() - 1,
                pageSize: pagination.pageSize,
              })
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronLast />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationArea;
