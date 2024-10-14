// src/components/VisitorsByCountryChart.tsx
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchVisitorsByCountry } from '../utils/api'; // Ensure this path is correct
import { ApexOptions } from 'apexcharts'; // Import ApexOptions

interface VisitorsByCountryChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const VisitorsByCountryChart: React.FC<VisitorsByCountryChartProps> = ({ startDate, endDate }) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: [], // This will be filled later with countries
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // data labels on top of the bars
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
  });

  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: 'Visitors', data: [] },
  ]);

  useEffect(() => {
    fetchVisitorsByCountry(startDate, endDate).then((data) => {
      const formattedData = data.map((item: any) => ({
        name: item.country,
        data: item.visitors,
      }));

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: data.map((item: any) => item.country),
        },
      }));

      setSeries(formattedData);
    });
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Visitors by Country</h2>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default VisitorsByCountryChart;
