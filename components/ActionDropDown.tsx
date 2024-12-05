import { SaleType } from "@/app/types";
import { useSalesStore } from "@/app/useSalesStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Copy, Edit, EllipsisVertical, Trash2 } from "lucide-react";

const ActionDropDown = ({ row }: { row: Row<SaleType> }) => {
  const { setSelectedSale, setOpenDeleteDialog, setOpenDealDialog } =
    useSalesStore();

  const menuItems = [
    {
      icon: <Copy />,
      label: "Copy",
      className: "",
    },
    {
      icon: <Edit />,
      label: "Edit",
      className: "",
    },
    {
      icon: <Trash2 className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  async function handleClickItem(item: string) {
    if (item ==='Edit') {
      setSelectedSale(row.original)
      setOpenDealDialog(true)
    }
    if (item === "Delete") {
      setSelectedSale(row.original);
      setOpenDeleteDialog(true);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="poppins">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`flex items-center gap-1 p-[10px] ${item.className}`}
            onClick={() => handleClickItem(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
