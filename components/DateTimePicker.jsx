"use client";

import { useState } from "react";
import { format, isBefore, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DateTimePicker({ value, onChange }) {
  const now = new Date();
  const [date, setDate] = useState(value || now);
  const [time, setTime] = useState(format(value || now, "HH:mm"));

  const handleDateChange = (selectedDate) => {
    if (!selectedDate || isBefore(selectedDate, now)) return;

    const updatedDate = new Date(selectedDate);
    const [hours, minutes] = time.split(":").map(Number);
    updatedDate.setHours(hours, minutes);

    setDate(updatedDate);
    onChange?.(updatedDate);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    const updatedDate = new Date(date);
    const [hours, minutes] = newTime.split(":").map(Number);
    updatedDate.setHours(hours, minutes);

    if (isToday(updatedDate) && isBefore(updatedDate, now)) return;
    setTime(newTime);
    setDate(updatedDate);
    onChange?.(updatedDate);
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {date ? format(date, "PP HH:mm") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar 
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          fromDate={now} />
        </PopoverContent>
      </Popover>
      <Input type="time" value={time} onChange={handleTimeChange} />
    </div>
  );
}
