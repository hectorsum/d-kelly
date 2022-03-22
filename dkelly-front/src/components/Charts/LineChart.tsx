import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "../../variables/charts";

const LineChart = (): JSX.Element => {
  const [formData, setFormData] = useState<any>({
    chartData: [],
    chartOptions:{}
  });
  useEffect(() => {
    if(lineChartData && lineChartOptions){
      setFormData({
        chartData: lineChartData,
        chartOptions: lineChartOptions
      })
    }
  },[])
  return (
    <ReactApexChart
      options={formData.chartOptions}
      series={formData.chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default LineChart;
