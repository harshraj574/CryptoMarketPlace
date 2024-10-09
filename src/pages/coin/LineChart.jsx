import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";


function LineChart({ chartData }) {
  const [data,setData] = useState([["Date","Prices"]]);

  useEffect(()=>{
    let dataCopy = [["Date","Prices"]];
    if(chartData.prices){
      chartData.prices.map((item)=>{
        dataCopy.push([`${new Date(item[0]).toLocaleDateString()}`,item[1]])
      })
      setData(dataCopy);
    }
  },[chartData])
  return (
   <Chart
    chartType='LineChart'
    data={data}
    height="100%"
    legendToggle
   />
  );
}
export default LineChart;