import { ActiveElement, ChartDataset, ChartEvent } from 'chart.js';
import { each } from 'chart.js/helpers';
import { ChartProps } from 'react-chartjs-2';
import { calculatePercent, externalTooltipHandler } from './common';
import { roundUpNumber } from './format';

interface BarChartConfig {
  dataset: number[];
  label: (string | string[])[];
  isHorizontal: boolean;
  useCustomLabel?: boolean;
  bgColor: string[];
  width: string;
  height: string;
  title: string;
  maxValue: number;
  tickXDisplay: boolean;
  tickYDisplay: boolean;
  chartRef?: any;
  chartStorage?: any;
  callback?: (index: number) => void;
  isExpand?: boolean;
}

interface DoughnutAndPieChartConfig {
  dataset: number[];
  labels: string[];
  onClick: (event: ChartEvent, elements: ActiveElement[]) => void;
  getBackground: string[];
  title?: string;
  isExpand?: boolean;
  isShortHand?: boolean;
}

const CONST = {
  GRID_BORDER_COLOR: '#787878',
  WHITE_SPACE_COLOR: 'RGBA(175, 179, 183, 0.1)',
  BAR_PERCENT: 0.5,
  BAR_THICKNESS: 18,
  EXPAND_THICKNESS: 50,
  MIN_BAR_LENGTH: 2,
  LINE_WIDTH: 2,
  BORDER_WIDTH: 2,
  CUT_OUT: '70%',
};

export const barChartConfig = (chartConfig: BarChartConfig): ChartProps<'bar'> => {
  const {
    dataset,
    label,
    isHorizontal,
    bgColor,
    width,
    height,
    title,
    maxValue,
    tickXDisplay,
    useCustomLabel,
    tickYDisplay,
    chartRef,
    callback,
    isExpand,
    chartStorage,
  } = chartConfig;
  const maxData: ChartDataset<'bar', number[]> = {
    barPercentage: CONST.BAR_PERCENT,
    barThickness: isExpand ? CONST.EXPAND_THICKNESS : CONST.BAR_THICKNESS,
    minBarLength: CONST.MIN_BAR_LENGTH,
    label: 'Max',
    data: [],
    backgroundColor: CONST.WHITE_SPACE_COLOR,
  };

  const datasets: ChartDataset<'bar', number[]>[] = [
    {
      barPercentage: CONST.BAR_PERCENT,
      barThickness: isExpand ? CONST.EXPAND_THICKNESS : CONST.BAR_THICKNESS,
      minBarLength: CONST.MIN_BAR_LENGTH,
      data: [...dataset],
    },
  ];

  datasets.forEach(function (ds) {
    const dataMaxValue = roundUpNumber(maxValue) as number;
    ds.data.forEach(function (value, index) {
      if (maxData.data.length <= index) {
        maxData.data.push(dataMaxValue);
      }
      maxData.data[index] -= value;
    });
  });

  datasets.push(maxData);

  return {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets,
    },
    options: {
      indexAxis: isHorizontal ? 'y' : 'x',
      onResize: () => {
        // dônthing
        // console.log({ chart, size });
      },
      onClick: (chartEvent: ChartEvent) => {
        if ((chartRef && chartRef.current) || chartStorage) {
          // clicked element
          const chartInstance = chartRef.current ? chartRef.current : chartStorage;
          const activeElement = chartInstance.getElementsAtEventForMode(
            chartEvent,
            'nearest',
            { intersect: true },
            true,
          );
          if (activeElement[0]) {
            callback && callback(activeElement[0].index);
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              family: 'Lato',
            },
          },
        },
        title: {
          text: title,
          display: title ? true : false,
        },
        tooltip: {
          yAlign: 'bottom',
          xAlign: 'center',
          enabled: false,
          filter: function (tooltipItem) {
            return tooltipItem.datasetIndex < datasets.length - 1;
          },
          backgroundColor: 'black',
          external: externalTooltipHandler,
        },
      },
      scales: {
        x: {
          max: roundUpNumber(maxValue),
          stacked: true,
          grid: {
            borderColor: CONST.GRID_BORDER_COLOR,
            lineWidth: CONST.LINE_WIDTH,
            borderWidth: CONST.BORDER_WIDTH,
            display: isHorizontal,
            drawOnChartArea: false,
            color: function () {
              return CONST.GRID_BORDER_COLOR;
            },
          },
          ticks: {
            display: tickXDisplay,
            font: {
              size: isExpand ? 16 : 9,
            },
            color: 'black',
            // autoSkip: false,
            // maxRotation: 90,
            // minRotation: 90,
          },
        },
        y: {
          max: roundUpNumber(maxValue),
          stacked: true,
          display: true,
          grid: {
            borderColor: CONST.GRID_BORDER_COLOR,
            lineWidth: CONST.LINE_WIDTH,
            borderWidth: CONST.BORDER_WIDTH,
            display: !isHorizontal,
            drawOnChartArea: false,
            color: function () {
              return CONST.GRID_BORDER_COLOR;
            },
          },
          ticks: {
            display: tickYDisplay,
            maxTicksLimit: 8,
            color: 'black',
            font: {
              size: isExpand ? 18 : 9,
            },
          },
        },
      },

      elements: {
        bar: {
          backgroundColor: bgColor,
          borderWidth: 0,
        },
      },
      animation: {
        onComplete() {
          if ((chartRef && chartRef.current) || chartStorage) {
            if (useCustomLabel) {
              const chart = chartRef.current ? chartRef.current : chartStorage;
              const ctx = chart.ctx;

              ctx.textAlign = 'center';
              ctx.font = `bold ${isExpand ? '18px' : '8px'} "Lato-Heavy", Helvetica, Arial, sans-serif`;
              if (chart.data) {
                each(
                  chart.data.datasets.forEach(function (dt, i) {
                    const meta = chart.getDatasetMeta(i);
                    each(
                      meta.data.forEach(function (bar, index) {
                        if (bar.options.backgroundColor === CONST.WHITE_SPACE_COLOR) {
                          return;
                        }
                        // tricky to show text value
                        if (isHorizontal) {
                          const margin = isExpand ? 70 : 30;
                          const textPosition =
                            dataset[index] <= maxValue - (30 / maxValue) * 100
                              ? bar.x + label[index].length + margin
                              : (50 * Number(bar.x.toFixed(0))) / 100;
                          if (dataset[index] >= maxValue - (30 / maxValue) * 100) {
                            ctx.fillStyle = 'white';
                          } else {
                            ctx.fillStyle = 'black';
                          }
                          ctx.fillText(label[index], textPosition, bar.y + 3);
                        } else {
                          let textPosition;
                          if (dataset[index] >= maxValue - (10 * maxValue) / 100) {
                            textPosition = bar.y + 20;
                            ctx.fillStyle = 'white';
                            ctx.font = `bold ${isExpand ? '18px' : '7px'} "Lato-Heavy", Helvetica, Arial, sans-serif`;
                          } else {
                            ctx.fillStyle = 'black';
                            textPosition = bar.y - 5;
                          }
                          ctx.fillText(label[index], bar.x, textPosition);
                        }
                      }),
                      () => {
                        // do nothing
                      },
                    );
                  }),
                  () => {
                    // do nothing
                  },
                );
              }
            }
          }
        },
      },
    },
    width,
    height,
  };
};

export const pieAndDoughnutChartConfig = (chartConfig: DoughnutAndPieChartConfig): ChartProps<'doughnut'> => {
  const { onClick, getBackground, labels, dataset, title, isExpand, isShortHand } = chartConfig;
  const total = dataset?.reduce((acc, cur) => acc + cur);

  const dataProcess = dataset.map((genderInfo) => {
    if ((genderInfo / total) * 100 < 1 && (genderInfo / total) * 100 > 0) {
      return 0.01 * total;
    }
    return genderInfo;
  });
  return {
    options: {
      cutout: CONST.CUT_OUT,
      onClick: onClick,
      maintainAspectRatio: false,
      onResize: () => {
        // do nothing
      },
      plugins: {
        tooltip: {
          backgroundColor: 'black',
          callbacks: {
            label: function (context) {
              const label = `${' '}${isShortHand ? context.label.slice(0, 3).toUpperCase() : context.label}: ${dataset[
                context.dataIndex
              ]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${calculatePercent(dataset, context.dataIndex)}%)`;

              return label;
            },
          },
          bodyFont: {
            size: 9,
          },
          bodyAlign: 'center',
          padding: {
            top: 10,
            bottom: 8,
            left: 6,
            right: 6,
          },
        },
        legend: {
          display: false,
        },
        title: {
          text: title,
          display: Boolean(title),
          color: 'black',
          font: {
            size: isExpand ? 24 : window.innerWidth > 1366 ? 16 : 16,
            family: 'Lato',
            weight: 'bold',
          },
        },
      },
    },
    type: 'doughnut',
    data: {
      labels: labels ? labels : [],
      datasets: [
        {
          label: 'label1',
          data: dataProcess ? dataProcess : [],
          backgroundColor: getBackground,
          borderWidth: 0,
        },
      ],
    },
    width: 'auto',
    height: '100%',
  };
};
