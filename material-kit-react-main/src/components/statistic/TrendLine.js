/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import sessionKey from 'src/constants/sessionKey';

const TrendLine = ({ past12Month, confirmed }) => {
  const myData = past12Month;
  const data = {
    labels: myData.map((i) => i.date),
    datasets: [
      {
        label: (confirmed === true ? 'New Confirmed Cases' : 'New COVID-19 Tests'),
        data: myData.map((i) => (confirmed === true ? i.new_cases : i.new_tests)),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: (confirmed === true ? 'rgba(171, 68, 138, 1)' : 'rgba(75,192,192,1)'),
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
            text: (confirmed === true ? 'New Confirmed Cases' : 'New COVID-19 Tests'),
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
