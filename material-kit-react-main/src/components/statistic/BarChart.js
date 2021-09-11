import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const dataHorBar = {
    labels: ['New Zealand'],
    datasets: [
      {
        label: 'New Cases Count',
        backgroundColor: '#EC932F',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [23]
      },
      {
        label: 'New Deaths Count',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [3]
      }
    ]
  };
  return (
    <div>
      <Bar
        data={dataHorBar}
        options={{
          title: {
            display: true,
            text: 'New Cases and New Deaths Count',
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
export default BarChart;
