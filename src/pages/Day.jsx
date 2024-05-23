import React, { useEffect, useState } from "react";
import data_json from '../assets/data.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function Hour() {
  const [dataChart, setDataChart] = useState({ labels: [], datasets: [] });

  function timeConverter(time) {
    const a = new Date(time);
    const hour = a.getHours();
    return `${hour}:00`;
  }

  useEffect(() => {
    const labels = [];
    const values = [];
    const interval = 60 * 60 * 1000; // 1 hour in milliseconds
    const oneDayInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    data_json[0].rates.forEach((el, index) => {
      // Only add label if it's a 1-hour interval
      if (index % (interval / data_json[0].interval) === 0) {
        const timestamp = data_json[0].startTime + (index * data_json[0].interval);
        labels.push(timeConverter(timestamp));
        values.push(el);
      }
    });

    // Add label for the end of the day
    const lastTimestamp = data_json[0].startTime + (data_json[0].rates.length - 1) * data_json[0].interval;
    labels.push(timeConverter(lastTimestamp + oneDayInterval));

    setDataChart({
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: values,
          borderColor: "rgba(0, 21, 255, 0.831)",
          backgroundColor: "rgb(0, 26, 255)",
        },
      ],
    });

  }, []);

  return (
    <div className="mx-auto w-[1100px]">
      {dataChart?.labels?.length ? (
        <Line options={options} data={dataChart} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
