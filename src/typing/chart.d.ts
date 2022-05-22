import Chart from 'chart.js';

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ChartInstance extends Chart {}
}
