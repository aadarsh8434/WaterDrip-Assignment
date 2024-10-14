import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchVisitorsData } from '../utils/api';
import { ApexOptions } from 'apexcharts';

interface VisitorDataPoint {
  x: Date;
  y: number;
}

interface VisitorsTimeSeriesChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const VisitorsTimeSeriesChart: React.FC<VisitorsTimeSeriesChartProps> = ({ startDate, endDate }) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Number of Visitors Over Time',
      align: 'left',
    },
  });

  const [series, setSeries] = useState<{ name: string; data: VisitorDataPoint[] }[]>([
    { name: 'Visitors', data: [] },
  ]);

  useEffect(() => {
    fetchVisitorsData(startDate, endDate).then((data) => {
      // Log the data received from API
      console.log(data);

      // Check if the data is an array
      if (Array.isArray(data)) {
        const formattedData: VisitorDataPoint[] = data.map((item: any) => ({
          x: new Date(item.date),
          y: item.visitors,
        }));
        
        setSeries([{ name: 'Visitors', data: formattedData }]);
      } else {
        console.error("Expected data to be an array, but got:", data);
      }
    });
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Visitors Time Series</h2>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default VisitorsTimeSeriesChart;
