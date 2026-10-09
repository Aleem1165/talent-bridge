"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (dateStr: string) => void;
  placeholder?: string;
  name?: string;
}

const CustomDateInput = React.forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void; placeholder?: string }
>(({ value, onClick, placeholder }, ref) => (
  <div className="relative w-full cursor-pointer" onClick={onClick}>
    <input
      ref={ref}
      type="text"
      readOnly
      value={value}
      placeholder={placeholder || "Select date (DD/MM/YYYY)"}
      className="w-full bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
    />
    <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
));

CustomDateInput.displayName = "CustomDateInput";

export default function CustomDatePicker({
  value,
  onChange,
  placeholder,
}: CustomDatePickerProps) {
  // Parse YYYY-MM-DD string to Date object
  const parsedDate = React.useMemo(() => {
    if (!value) return null;
    const parts = value.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      onChange("");
      return;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    onChange(`${year}-${month}-${day}`);
  };

  return (
    <div className="w-full min-w-0">
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={<CustomDateInput placeholder={placeholder} />}
        popperPlacement="bottom-start"
        popperProps={{
          strategy: "fixed",
        }}
      />
    </div>
  );
}
