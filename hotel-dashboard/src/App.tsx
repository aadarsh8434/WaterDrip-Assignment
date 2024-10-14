// src/App.tsx

import React, { useState } from 'react';
import DatePicker from './components/DatePicker';
import VisitorsTimeSeriesChart from './components/VisitorsTimeSeriesChart';
import VisitorsByCountryChart from './components/VisitorsByCountryChart';
import AdultVisitorsSparkline from './components/AdultVisitorsSparkline';
import ChildrenVisitorsSparkline from './components/ChildrenVisitorsSparkline';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    // You may want to add logic to fetch data based on the selected date range
  };

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>
      <DatePicker onDateChange={handleDateChange} /> {/* Pass the onDateChange prop */}
      <VisitorsTimeSeriesChart startDate={startDate} endDate={endDate} />
      <VisitorsByCountryChart startDate={startDate} endDate={endDate} />
      <AdultVisitorsSparkline startDate={startDate} endDate={endDate} />
      <ChildrenVisitorsSparkline startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default App;
