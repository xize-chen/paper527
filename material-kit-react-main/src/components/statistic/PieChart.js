/* eslint-disable react/prop-types */
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ topTenCases }) => {
  const top5 = topTenCases.slice(0, 5);
  const data = {
    labels: top5.map((i) => i.location),
    datasets: [
      {
        label: '# of Cases',
        data: top5.map((i) => i.total_cases),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie
        data={data}
        width={350}
        height={350}
        options={{
          title: {
            display: true,
            text: 'Top 5 Total Deaths by Country',
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'left'
          },
          maintainAspectRatio: false

        }}

      />
    </>
  );
};

export default PieChart;
