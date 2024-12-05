import { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ActionDropDown from "../ActionDropDown";
import { format } from "date-fns";
import { SaleType } from "@/app/types";
import { ArrowDownIcon, ArrowDownUp, ArrowUpIcon } from "lucide-react";
import { Button } from "../ui/button";

interface SortableHeaderProps {
  column: Column<SaleType, unknown>;
  label: string;
}

function sortingIcon(isSorted: boolean | string) {
  if (isSorted === "asc") {
    return <ArrowUpIcon />;
  } else if (isSorted === "desc") {
    return <ArrowDownIcon />;
  } else {
    return <ArrowDownUp />;
  }
}

function SortableHeader({ column, label }: SortableHeaderProps) {
  const isSorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      className={`${isSorted && "text-primary"}`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {sortingIcon(isSorted)}
    </Button>
  );
}

export const salesColumns: ColumnDef<SaleType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-4">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Customer Name" />;
    },
  },
  {
    accessorKey: "dealValue",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Deal Value" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge className="rounded-xl bg-primary/15 text-primary font-normal select-none shadow-none">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contactDate",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Contact Date" />;
    },
    cell: ({ row }) => {
      const contactDate = row.original.contactDate;
      const formattedDate = contactDate
        ? format(new Date(contactDate), "dd/MM/yyyy")
        : "N/A";

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "salesperson",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Salesperson" />;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Priority" />;
    },
    cell: ({ row }) => {
      const priority = row.original.priority;
      let priorityColor = "";

      if (priority === "Low") {
        priorityColor = "bg-green-500 text-white";
      } else if (priority === "Medium") {
        priorityColor = "bg-yellow-500 text-white";
      } else if (priority === "High") {
        priorityColor = "bg-red-500 text-white";
      }

      return (
        <Badge
          className={`${priorityColor} font-semibold hover:bg-${priorityColor} shadow-none`}
        >
          {priority}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionDropDown row={row} />;
    },
  },
];
