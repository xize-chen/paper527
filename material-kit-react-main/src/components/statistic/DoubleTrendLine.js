/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import sessionKey from 'src/constants/sessionKey';

const DoubleTrendLine = ({ array, confirmed }) => {
  // const myData = past12Month;
  const dataset = () => {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      result.push({
        label: array[index].country,
        data: array[index].line.map((i) => (confirmed === true ? i.new_cases : i.new_tests)),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: (index === 0 ? 'rgba(171, 68, 138, 1)' : 'rgba(75,192,192,1)'),
      });
      if (array.length > 1 && (array[0].country === array[1].country)) {
        break;
      }
    }
    return result;
  };
  const data = {
    labels: array[0].line.map((i) => i.date),
    datasets: dataset()
  };
  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: false,
            text: (confirmed === true ? 'New Confirmed Cases' : 'New COVID-19 Tests'),
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
      />
    </div>
  );
};
export default DoubleTrendLine;
