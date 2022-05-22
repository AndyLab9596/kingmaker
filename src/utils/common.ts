export const addRandomColors = (array: string[], addColors: number) => {
  for (let i = 0; i <= addColors; i++) {
    array.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  return array;
};

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'black';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.fontSize = '8px';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  if (tooltip.body?.length <= 0) return;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement('thead');
    titleLines.forEach((title) => {
      const tr: any = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th: any = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = 'white';
      span.style.borderWidth = '1px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr: any = document.createElement('tr');
      tr.style.borderWidth = 0;

      const td: any = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.maxWidth = '130px';
  tooltipEl.style.opacity = 1;
  tooltipEl.style.fontSize = '10px';
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY - 50 + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export const calculatePercent = (datasets, index: number) => {
  if (datasets && datasets.length > 0) {
    const total = datasets.reduce((acc, cur) => acc + cur);
    const itemPercent = (datasets[index] / total) * 100;
    if (isNaN(itemPercent)) {
      return 0;
    }
    if (itemPercent % 2 === 0) {
      return itemPercent;
    }

    if (itemPercent % 2 !== 0) {
      const valueArray = itemPercent.toFixed(2).split('.');
      if (valueArray[1] === '00') {
        return valueArray[0];
      }
      if (Number(valueArray[1][1]) === 0) {
        return itemPercent.toFixed(1);
      }
      return itemPercent.toFixed(2);
    }
  }
  return 0;
};
