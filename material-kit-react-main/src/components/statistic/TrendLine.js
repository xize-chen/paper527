/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';

const TrendLine = ({ past12Month }) => {
  const myData = past12Month.reverse();
  const data = {
    labels: myData.map((i) => i.date),
    datasets: [
      {
        label: 'Total Confirmed Cases',
        data: myData.map((i) => i.total_cases),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      },

    ]
  };
  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'New Zealand Total Cases Over 12 Month',
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
