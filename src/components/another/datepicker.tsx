"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/utils/cn-tools";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
  onChange: (date: Date) => void;
  month: number;
  year: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

export function DatePicker({ onChange, month, year, setMonth, setYear }: DatePickerProps) {

  const handleMonthChange = (value: string) => {
    setMonth(parseInt(value) - 1);
  };

  const handleYearChange = (value: string) => {
    setYear(parseInt(value));
  };

  const handleDateChange = () => {
    const date = new Date(year, month);
    onChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(new Date(year, month), "MMMM yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" style={{
        width: '300px',
        height: 'auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }}>
        <div className="flex justify-between mb-2">
          <Select value={month.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="pr-1.5 focus:ring-0">
              <SelectValue>{format(new Date(year, month), "MMMM")}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              <div className="h-80 overflow-y-auto">
                {Array.from(Array(12), (_, i) => (
                  <SelectItem key={i} value={(i + 1).toString()}>
                    {format(new Date(year, i), "MMMM")}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="pr-1.5 focus:ring-0">
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              <div className="h-80 overflow-y-auto">
                {Array.from(Array(100), (_, i) => (
                  <SelectItem key={i} value={(new Date().getFullYear() - 50 + i).toString()}>
                    {new Date().getFullYear() - 50 + i}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDateChange}
        >
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
}