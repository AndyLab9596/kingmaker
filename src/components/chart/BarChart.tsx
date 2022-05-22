/*
 * use barchart Horizontal
 * options={{
 *		indexAxis: 'y',
 *	}}
 */
import { ActiveElement, ChartEvent } from 'chart.js';
import React from 'react';
import { ChartProps, Bar } from 'react-chartjs-2';

const defaultColors = ['Red', 'Orange', 'Yellow'];

// TODO Apply Props

const BarChart: React.FC<Partial<ChartProps<'bar'>>> = React.memo((props) => {
  const { title } = props;
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);

  const getBackground = React.useMemo(() => {
    if (activeIndex === null) {
      return [...defaultColors];
    } else {
      const newColors = [...defaultColors];
      newColors.forEach((color, index, colors) => {
        if (activeIndex !== index) {
          colors[index] = '#dbdbdb';
        }
      });
      return newColors;
    }
  }, [activeIndex]);

  const onClick = (event: ChartEvent, elements: ActiveElement[]) => {
    const active = elements[0].index === activeIndex;
    if (active) {
      setActiveIndex(null);
    } else {
      setActiveIndex(elements[0].index);
    }
  };

  return (
    <Bar
      options={{
        onClick: onClick,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: !!title,
            text: title,
          },
        },
      }}
      data={{
        labels: defaultColors,
        datasets: [
          {
            label: 'label1',
            data: [1, 2, 3],
            backgroundColor: getBackground,
          },
        ],
      }}
      {...props}
    />
  );
});

export default BarChart;
