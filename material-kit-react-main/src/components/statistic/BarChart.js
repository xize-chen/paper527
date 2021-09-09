import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const dataHorBar = {
    labels: ['US', 'India', 'Russia', 'United Kingdom', 'Argentina', 'Italy', 'Germany'],
    datasets: [
      {
        label: 'Total confirmed cases by country',
        backgroundColor: '#EC932F',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [100, 90, 80, 70, 60, 50, 40]
      },
      {
        label: 'Total deaths by country',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [10, 9, 8, 7, 6, 5, 4]
      }
    ]
  };
  return (
    <div>
      <h2>Bar Graph local weekly country cases and death</h2>
      <Bar data={dataHorBar} />
    </div>
  );
};
export default BarChart;
