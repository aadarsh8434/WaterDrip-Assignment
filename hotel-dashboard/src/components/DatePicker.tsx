import React, { useState } from 'react';

interface DatePickerProps {
  onDateChange: (start: Date, end: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleApply = () => {
    if (startDate && endDate) {
      onDateChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleApply}>Apply Date Filter</button>
    </div>
  );
};

export default DatePicker;
