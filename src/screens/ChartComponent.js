import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

const ChartComponent = ({ sumWeek, sumMonth, dayOfWeek, month }) => {
  const chartRef = useRef(null);
  console.log(sumMonth,);
  const data = {
    labels: dayOfWeek?.map((day) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day])
      || month?.map((item) => item),
    datasets: [
      {
        label: 'Weekly Sales',
        data: sumWeek?.map((item) => item.sum) || sumMonth?.map((item) => item),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Day of the Week',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Sales',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Weekly Sales',
      },
    },
    width: '100%',
  };

  useEffect(() => {
    const chart = chartRef.current;
    return () => chart?.destroy();
  }, []);

  return <Line ref={chartRef} data={data} options={options} style={{ width: '100%' }} />;
};


export default ChartComponent;