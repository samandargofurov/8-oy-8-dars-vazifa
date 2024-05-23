import React, { useEffect, useState } from "react";
import data_json from '../assets/data.json'
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
  const [ dataChart, setDataChart ] = useState([])

  function timeConverter(time){
    var a = new Date(time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;  
  }

  useEffect(() => {
    let labels = [];
    let values = [];

    data_json.rates.forEach((el, index) => {
      labels.push(timeConverter(data_json.startTime + index + data_json.interval));
      values.push(el)
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

  }, [])

  return (
    <>
      <div>
        {
          dataChart?.labels?.length && <Line options={options} data={dataChart} />
        }
      </div>
    </>
  );
}
