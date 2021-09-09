import React from 'react';
import { Line } from 'react-chartjs-2';

const TrendLine = () => {
  const data = {
    labels: ['Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021', 'May 2021', 'Jun 2021'],
    datasets: [
      {
        label: 'Total Confirmed Cases',
        data: [33, 53, 85, 100, 150, 200],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Total Deaths',
        data: [1.7, 2.7, 4.3, 5, 7.5, 10],
        fill: false,
        borderColor: '#742774'
      }
    ]
  };
  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Total number of confirmed, deaths',
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'top'
          }
        }}
      />
    </div>
  );
};
export default TrendLine;
