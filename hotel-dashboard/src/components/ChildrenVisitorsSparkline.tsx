import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchChildrenVisitors } from '../utils/api';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
}

const ChildrenVisitorsSparkline: React.FC<Props> = ({ startDate, endDate }) => {
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchChildrenVisitors(startDate, endDate).then((data) => {
        const formattedData = data.map((item: any) => ({
          x: new Date(item.date),
          y: item.visitors,
        }));
        setSeries([{ name: 'Children Visitors', data: formattedData }]);
      });
    }
  }, [startDate, endDate]);

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      type: 'datetime' as const, // Explicitly cast 'datetime' to the expected type
    },
  };

  return (
    <div>
      <h2>Children Visitors</h2>
      <ReactApexChart options={options} series={series} type="line" height={100} />
    </div>
  );
};

export default ChildrenVisitorsSparkline;
