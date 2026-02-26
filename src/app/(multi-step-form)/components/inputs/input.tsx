import React, { forwardRef } from "react";
import { Input } from "@heroui/input";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label = "Nom",
      placeholder = "Ex : El Mehdi",
      type = "text",
      value,
      onChange,
      isRequired = false,
      isInvalid = false,
      errorMessage = "",
      onBlur,
      inputMode,
    },
    ref,
  ) => {
    return (
      <Input
        className="bg-"
        ref={ref}
        labelPlacement="outside"
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        onBlur={onBlur}
        classNames={{
          label: "text-Neutral-Dark",
          input: [
            "text-[14px]/[0px]",
            "bg-transparent",
            "placeholder:text-Sage-Gray-Medium",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "px-[12px] h-11",
            "rounded-[8px]",
            "gap-2",
            "outline-none shadow-none",
            "bg-Sage-Gray-Lowest",
            "data-[hover=true]:bg-Sage-Gray-Lower",
            "border border-transparent data-[hover=true]:border-transparent",
            "group-data-[focus=true]:border-Sage-Gray-Medium group-data-[focus=true]:outline-none group-data-[focus=true]:shadow-none",
            "cursor-text!",
          ],
        }}
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onValueChange={onChange}
        inputMode={inputMode}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
