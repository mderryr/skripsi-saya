import { Calendar } from "@/components/ui/calendar";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface DatePickerInputProps {
  label: string;
  name: string;
  control: { [key: string]: Date };
}

const DatePickerInput = ({ label, name, control }: DatePickerInputProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Calendar
          selected={control[name] ? [control[name]] : []}
          onDayClick={(day: Date) => (control[name] = day)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerInput;