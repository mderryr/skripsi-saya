import { useState } from 'react';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [date, setDate] = useState(value);

  const handleDateChange = (date: Date) => {
    setDate(date);
    onChange(date);
  };

  return (
    <input
      type="date"
      value={date.toISOString().split('T')[0]}
      onChange={(e) => handleDateChange(new Date(e.target.value))}
    />
  );
};

export default DatePicker;