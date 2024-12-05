import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CircleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";

const CustomerName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="customer-name" className="text-slate-600">
        Customer Name
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          id="customer-name"
          placeholder="Adham Nasser..."
          className="h-11 shadow-none"
          {...register("customerName")}
        />
      </div>

      {errors.customerName && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <CircleAlert />
          <p>{errors.customerName.message as string}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerName;
