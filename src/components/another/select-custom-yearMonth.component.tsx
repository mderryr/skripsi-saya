"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

// Komponen Select Bulan
export function MonthSelect({
    selectedMonth,
    onMonthChange
}: {
    selectedMonth: number;
    onMonthChange: (month: number) => void;
}) {
    const months = Array.from(Array(12), (_, i) => ({
        value: i + 1,
        label: format(new Date(2021, i), "MMMM"), // Using a fixed year for formatting
    }));

    return (
        <div className="w-full"> {/* Wrapper div untuk lebar penuh */}
            <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => onMonthChange(Number(value))}
            >
                <SelectTrigger className="w-full"> {/* Set SelectTrigger to full width */}
                    <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                            {month.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

// Komponen Select Tahun
export function YearSelect({
    selectedYear,
    onYearChange
}: {
    selectedYear: number;
    onYearChange: (year: number) => void;
}) {
    const years = Array.from(
        { length: new Date().getFullYear() - 2009 + 1 },
        (_, i) => 2009 + i
    );

    return (
        <div className="w-full"> {/* Wrapper div untuk lebar penuh */}
            <Select
                value={selectedYear.toString()}
                onValueChange={(value) => onYearChange(Number(value))}
            >
                <SelectTrigger className="w-full"> {/* Set SelectTrigger to full width */}
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
