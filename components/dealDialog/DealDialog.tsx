"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import CustomerName from "./CustomerName";
import SaleValue from "./SaleValue";
import Status from "./Status";
import ContactDate from "./ContactDate";
import SalesPeople from "./SalesPeople";
import Priority from "./Priority";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalePriority, SaleStatus, SaleType } from "@/app/types";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useSalesStore } from "@/app/useSalesStore";
import { useToast } from "@/hooks/use-toast";

const dialogSchema = z.object({
  customerName: z.string().min(3, { message: "Customer Name is required" }),
  contactDate: z
    .date({ required_error: "Pleas select the date" })
    .refine((date) => !!date, "Date is required"),
  salesValue: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", { message: "Sale value is required" })
    .transform((val) => {
      if (val === "") return undefined;
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          invalid_type_error: "Sale value must be a number",
          required_error: "Sale value is required",
        })
        .nonnegative("Sale value cannot be negative")
    ),
});

type FormData = z.infer<typeof dialogSchema>;

export const salesPeople = [
  "Adham Nasser",
  "Ahmed Mohamed",
  "Ali Abdullah",
  "Amr Mohamed",
];

const DealDialog = () => {
  const [selectedPriority, setSelectedPriority] = useState<SalePriority>("Low");
  const [selectedStatus, setSelectedStatus] =
    useState<SaleStatus>("In Progress");
  const [selectedSalesperson, setSelectedSalesperson] = useState(
    salesPeople[0]
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      salesValue: 0.0,
      customerName: "",
    },
  });

  const {
    addSale,
    openDealDialog,
    setOpenDealDialog,
    selectedSale,
    setSelectedSale,
    updateSale,
  } = useSalesStore();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    if (!selectedSale) {
      const newSale: SaleType = {
        id: nanoid(),
        customerName: data.customerName,
        dealValue: data.salesValue.toString(),
        status: selectedStatus,
        contactDate: data.contactDate.toDateString(),
        salesperson: selectedSalesperson,
        priority: selectedPriority,
      };
      const result = await addSale(newSale);
      const formattedSaleValue = data.salesValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      if (result) {
        toast({
          title: "Sale Added",
          description: `Sale added successfully for ${newSale.customerName} with a value of ${formattedSaleValue}`,
        });
      }
    } else {
      const saleToUpdate: SaleType = {
        id: selectedSale.id,
        customerName: data.customerName,
        dealValue: data.salesValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        status: selectedStatus,
        contactDate: data.contactDate.toDateString(),
        salesperson: selectedSalesperson,
        priority: selectedPriority,
      };

      const result = await updateSale(saleToUpdate);
      if (result) {
        toast({
          title: "Sale Updated",
          description: `Sale updated successfully for ${saleToUpdate.customerName} with a new value of ${saleToUpdate.dealValue}`,
        });
      }
    }
    handleDialogClose();
    setOpenDealDialog(false);
  };

  const handleDialogClose = () => {
    methods.reset();
    setSelectedPriority("Low");
    setSelectedStatus("In Progress");
    setSelectedSalesperson(salesPeople[0]);
  };

  useEffect(() => {
    if (selectedSale) {
      methods.reset({
        customerName: selectedSale.customerName,
        contactDate: new Date(selectedSale.contactDate),
        salesValue: parseFloat(
          selectedSale.dealValue.replace(/[^0-9.-]+/g, "")
        ),
      });
      setSelectedPriority(selectedSale.priority);
      setSelectedStatus(selectedSale.status);
      setSelectedSalesperson(selectedSale.salesperson);
    } else {
      methods.reset({
        customerName: "",
        salesValue: 0.0,
      });
    }
  }, [openDealDialog, selectedSale, methods]);

  return (
    <Dialog open={openDealDialog} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="h-8" onClick={() => setOpenDealDialog(true)}>
          <Plus className="text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent
        id="modal"
        className="p-7 px-8 poppins max-h-screen sm:max-h-[90vh] max-sm:w-full overflow-auto !max-w-screen"
      >
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedSale ? "Update Sale" : "New Sale"}
          </DialogTitle>
          <DialogDescription>
            {selectedSale
              ? "Fill in the form to update a sale"
              : "Fill in the form to add a new sale"}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <CustomerName />
              <SaleValue />
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <Status
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <Priority
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <ContactDate />
              <SalesPeople
                selectedSalesperson={selectedSalesperson}
                setSelectedSalesperson={setSelectedSalesperson}
              />
            </div>

            <DialogFooter className="mt-8 mb-4 flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="h-11 px-11 max-sm:w-full"
                  onClick={() => {
                    setOpenDealDialog(false);
                    setSelectedSale(null);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="h-11 px-11 max-sm:w-full">
                {selectedSale ? "Update Sale" : "Add Sale"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default DealDialog;
