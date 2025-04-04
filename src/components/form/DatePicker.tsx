"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps  {
  value?: Date
  onChange: () => void
}
export function DatePicker({onChange,value}:DatePickerProps) {


  return (
    <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={value}
        onSelect={onChange}
        disabled={(date) =>
          date < new Date()
        }
        initialFocus
      />
    </PopoverContent>
  </Popover>
  )
}
