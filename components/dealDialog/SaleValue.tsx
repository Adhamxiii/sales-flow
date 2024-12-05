import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CircleAlert, DollarSign } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const SaleValue = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2 relative">
      <Label htmlFor="sale-value" className="text-slate-600">
        Sale Value
      </Label>
      <div className="flex gap-2 items-center">
        <Controller
          name="saleValue"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, ...field } }) => (
            <NumericFormat
              {...field}
              value={value}
              customInput={Input}
              thousandSeparator
              placeholder="22,000..."
              className="h-11 shadow-none"
              decimalScale={2}
              allowNegative={false}
              onValueChange={(values) => {
                const { floatValue, value } = values;
                onChange(value === "" ? "" : floatValue ?? 0);
              }}
            />
          )}
        />
      </div>

      {errors.saleValue && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <CircleAlert />
          <p>Please type in the amount</p>
        </div>
      )}
      <DollarSign className="absolute right-3 top-9 text-primary size-4" />
    </div>
  );
};

export default SaleValue;
