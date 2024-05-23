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
    const month = a.toLocaleString('default', { month: 'short' });
    const year = a.getFullYear();
    return `${month} ${year}`;
  }

  useEffect(() => {
    const labels = [];
    const values = [];
    const interval = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    data_json[1].rates.forEach((el, index) => {
      // Only add label if it's a 1-month interval
      if (index % (interval / data_json[1].interval) == 0) {
        labels.push(timeConverter(data_json[1].startTime + (index * data_json[1].interval)));
        values.push(el);
      }
    });

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
      {dataChart?.labels?.length && <Line options={options} data={dataChart} />}
    </div>
  );
}
