 // src/utils/api.ts

import hotelBookingsData from '../data/hotelBookingsData'; // Ensure the correct file name and path

// Function to fetch visitors data based on a date range
export const fetchVisitorsData = async (startDate: Date | null, endDate: Date | null): Promise<any[]> => {
  return hotelBookingsData.filter((item: any) => {
    const date = new Date(item.date);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });
};

// Function to fetch visitors by country within the date range
export const fetchVisitorsByCountry = async (startDate: Date | null, endDate: Date | null): Promise<any[]> => {
  const filteredData = hotelBookingsData.filter((item: any) => {
    const date = new Date(item.date);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  const aggregatedVisitors = filteredData.reduce((acc: Record<string, number>, cur: any) => {
    if (acc[cur.country]) {
      acc[cur.country] += cur.visitors;
    } else {
      acc[cur.country] = cur.visitors;
    }
    return acc;
  }, {});

  return Object.entries(aggregatedVisitors).map(([country, visitors]) => ({ country, visitors }));
};

// Function to fetch adult visitors based on a date range
export const fetchAdultVisitors = async (startDate: Date | null, endDate: Date | null): Promise<any[]> => {
  return hotelBookingsData.filter((item: any) => {
    const date = new Date(item.date);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate) && item.adults > 0;
  });
};

// Function to fetch children visitors based on a date range
export const fetchChildrenVisitors = async (startDate: Date | null, endDate: Date | null): Promise<any[]> => {
  return hotelBookingsData.filter((item: any) => {
    const date = new Date(item.date);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate) && item.children > 0;
  });
};
