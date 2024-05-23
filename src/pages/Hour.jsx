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
    const period = hour >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHour = hour % 12; // Convert 24-hour format to 12-hour format
    return `${formattedHour} ${period}`;
  }

  useEffect(() => {
    const labels = [];
    const values = [];

    data_json[0].rates.forEach((el, index) => {
      // Only add label if it's a 12-hour interval
      if (index % 6 == 0) {
        labels.push(timeConverter(data_json[0].startTime + (index * data_json[0].interval)));
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
