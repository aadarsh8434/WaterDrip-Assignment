import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchAdultVisitors } from '../utils/api';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions

interface AdultVisitorsSparklineProps {
    startDate: Date | null;
    endDate: Date | null;
}

const AdultVisitorsSparkline: React.FC<AdultVisitorsSparklineProps> = ({ startDate, endDate }) => {
    const [data, setData] = useState<{ name: string; data: number[] }[]>([]);

    useEffect(() => {
        fetchAdultVisitors(startDate, endDate).then((visitors) => {
            const validData = Array.isArray(visitors) ? visitors : [];
            setData([{ name: 'Adult Visitors', data: validData }]);
        });
    }, [startDate, endDate]);

    // Define the options with ApexOptions type
    const options: ApexOptions = {
        chart: {
            type: 'line', // This should be fine as 'line' is a valid type
            height: 350,
        },
        stroke: {
            curve: 'smooth',
        },
        title: {
            text: 'Adult Visitors',
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
        },
    };

    return (
        <Chart options={options} series={data} type="line" />
    );
};

export default AdultVisitorsSparkline;
