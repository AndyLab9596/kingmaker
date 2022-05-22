import React from 'react';
import { ChartProps, Doughnut } from 'react-chartjs-2';

// TODO Apply Props
const DoughnutChart: React.FC<ChartProps<'doughnut'>> = React.memo((props) => {
  return <Doughnut {...props} />;
});

export default DoughnutChart;
