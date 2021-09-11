import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const CompareCharts = ({ chartLabel, compareData }) => {
  const dataHorBar = {
    labels: compareData.names,
    datasets: [
      {
        label: 'Total cases',
        backgroundColor: '#EC932F',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: compareData.case
      },
      {
        label: 'Total deaths',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: compareData.death
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
            text: chartLabel,
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

CompareCharts.propTypes = {
  compareData: PropTypes.array.isRequired,
  chartLabel: PropTypes.string.isRequired
};

export default CompareCharts;
