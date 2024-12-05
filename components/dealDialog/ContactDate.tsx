"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, CircleAlert } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import { useSalesStore } from "@/app/useSalesStore";

const ContactDate = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { selectedSale } = useSalesStore();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setValue("contactDate", selectedDate);
    setDate(selectedDate);
    if (selectedDate) {
      clearErrors("contactDate");
    }
  };

  useEffect(() => {
    if (selectedSale) {
      const saleDate = new Date(selectedSale.contactDate);
      setDate(saleDate);
      setValue("contactDate", saleDate);
    } else {
      setValue("contactDate", date);
    }
    clearErrors("contactDate");
  }, [selectedSale, clearErrors, date, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-slate-600">Last Visit</Label>
      <Popover>
        <PopoverTrigger className="border" asChild>
          <Button
            variant="outline"
            className="border flex gap-1 items-center justify-start h-11"
          >
            <CalendarIcon className={`${!date && "text-slate-500"}`} />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-slate-500">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>
      {errors.contactDate && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <CircleAlert />
          <p>Please select the date</p>
        </div>
      )}
    </div>
  );
};

export default ContactDate;
