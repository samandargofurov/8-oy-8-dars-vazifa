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

export default function Hour() {
  const [dataChart, setDataChart] = useState({ labels: [], datasets: [] });

  function timeConverter(time) {
    const a = new Date(time);
    const date = a.getDate();
    const month = a.toLocaleString('default', { month: 'short' });
    const hour = a.getHours();
    return `${month} ${date}, ${hour}:00`;
  }

  useEffect(() => {
    const labels = [];
    const values = [];
    const oneDayInterval = 12 * 60 * 10 * 10000; // 1 day in milliseconds
    const oneWeekInterval = 21 * oneDayInterval; // 1 week in milliseconds

    data_json[0].rates.forEach((el, index) => {
      // Only add label if it's the first day of the week
      if (index % (oneWeekInterval / data_json[0].interval) === 0) {
        const timestamp = data_json[0].startTime + (index * data_json[0].interval);
        labels.push(timeConverter(timestamp));
        values.push(el);
      }
    });

    // Add label for the end of the week
    const lastTimestamp = data_json[0].startTime + (data_json[0].rates.length - 1) * data_json[0].interval;
    labels.push(timeConverter(lastTimestamp + oneWeekInterval));

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
        <Line data={dataChart} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
