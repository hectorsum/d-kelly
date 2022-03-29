import { Box, Flex, Select } from "@chakra-ui/react";
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
    <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
      <Select placeholder='Selecciona Producto' width={"300px"}>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <ReactApexChart
        options={formData.chartOptions}
        series={formData.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    </Box>
  );
}

export default LineChart;
