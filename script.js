
const PERCENT_HEIGHT_FILLED = 0.95;
const data1 = [[4, 1], { label: 'hi', data: [7, 1, 2], colours: ['blue', 'white'], labelColours: ['white', 'green'] }, { data: [3], colours: ['white'] }, 4, 5];
const DEFAULT_COLOUR = 'red';
const DEFAULT_LABEL_COLOUR = 'white';
const options1 = {
  height: '600px',
  width: '700px'
  // dataPosition: "bottom",
  // barSpacing: 0.4,
  // barBorders: 'off',
  // title: "Data",
  // titleFontSize: '2em',
  // titleFontColour: 'Blue',
  // xAxisTitle: 'Domain',
  // yAxisTitle: 'range',
  // axisTitleFontSize: '1em',
  // labelColour: "red",
  // fontSize: '1em',
  // yAxisTicks: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10]
}
const data2 = [7,12,17,6,13];
const options2 = {
  height: '500px',
  width: '700px',
  barBorders: 'off',
  title: "Second",
  titleFontSize: '2em',
  titleFontColour: 'Blue',
  xAxisTitle: 'Domain',
  yAxisTitle: 'range',
  axisTitleFontSize: '1em',
  fontSize: '1em'
}

function makeChart(data, options, element) {
  let barChart = $('<div class="barChart"/>').appendTo(element).css({...CSSClasses.barChart, 'height': String(options.height), 'width': String(options.width)});
  makeTitles(barChart,options);
  const chartWidth = Number(options.width.match(/\d*\.*\d*/)[0]) * 0.9;
  const chartDimensions = {
    chartWidth: chartWidth,
    chartWidthUnits: options.width.match(/[a-zA-z]+/)[0],
    chartHeightUnits: options.height.match(/[a-zA-z]+/)[0],
    chartHeight: options.height.match(/\d*\.*\d*/)[0],
    barWidth: chartWidth * (1 - (options.barSpacing ? options.barSpacing : 0.2)) / data.length,
    unitHeight: getUnitHeight(options,data)
  }
  makeXLabels(barChart, chartDimensions, data, options);
  makeYLabels(barChart, chartDimensions, options, data);
  loadData(barChart, chartDimensions, data, options);
}

function getUnitHeight(options,data) {
  const chartHeight = Number(options.height.match(/\d*\.*\d*/)[0]) * 0.7;
  if (options.yAxisTicks) {
    return chartHeight * PERCENT_HEIGHT_FILLED / Math.max(...options.yAxisTicks);
  } else {
    const max = findMaximumBarHeight(data);
    const increment = getIncrement(max);
    return chartHeight * PERCENT_HEIGHT_FILLED / (increment * Math.ceil((max) / increment));
  }
}

function findMaximumBarHeight(data) {
  let dataWithLabelsRemoved = data.map(dataPoint => dataPoint.data ? dataPoint.data : dataPoint);
  let totalBarHeights = dataWithLabelsRemoved.map(barHeight => Array.isArray(barHeight) ? barHeight.reduce((a, b) => a + b) : barHeight);
  const max = Math.max(...totalBarHeights);
  return max;
}

function makeStackedBars(chart, barHeights, chartDimensions, value, options) {
  const stackedBarsContainer = $("<div/>").appendTo(chart).css(CSSClasses.stackedBarContainer);
  barHeights.forEach((height, colourIndex) => {
    makeSingleBar(stackedBarsContainer, height, value, colourIndex, chartDimensions, options);
  });
}

function makeSingleBar(container, barHeight, value, colourIndex, chartDimensions, options) {
  const backGroundColour = (value.colours && value.colours[colourIndex] ? value.colours[colourIndex] : options.barColour ? options.barColour : DEFAULT_COLOUR);
  const dataPosition = options.dataPosition == 'top' ? 'flex-start' : options.dataPosition == 'bottom' ? 'flex-end' : 'center';
  const labelColour = (value.labelColours && value.labelColours[colourIndex] ? value.labelColours[colourIndex] : options.labelColour ? options.labelColour : DEFAULT_LABEL_COLOUR);
  const CSS = {...CSSClasses.bar, 'font-size': options.fontSize,
                  'height': String(chartDimensions.unitHeight * barHeight), 'align-items': dataPosition,
                  'background-color': backGroundColour, 'color': labelColour,
                  'width': (String(chartDimensions.barWidth) + chartDimensions.chartWidthUnits)}
  if(options.barBorders == 'on'){
    CSS = Object.assign(CSS, {'border-left': '1px solid black','border-right': '1px solid black','border-top': '1px solid black'});
  }
  $('<div/>').appendTo(container).css(CSS).text(barHeight);
}

function loadData(barChart, chartDimensions, data, options) {
  const chart = $('<div/>').appendTo(barChart).css(CSSClasses.chart)
  data.forEach(value => {
    const barHeight = value.data ? value.data : value;
    if (Array.isArray(barHeight)) {
      makeStackedBars(chart, barHeight, chartDimensions, value, options);
    }
    else {
      makeSingleBar(chart, barHeight, value, 0, chartDimensions, options);
    }
  });
}

function getIncrement(num) {
  const lastPower10 = 10 ** Math.floor(Math.log10(num));
  const increments = [lastPower10, lastPower10 / 2, lastPower10 / 4, lastPower10 / 10];
  for (let i = 0; i < increments.length; i++) {
    if (num / increments[i] >= 4 && num / increments[i] <= 10) {
      return increments[i];
    }
  }
}

function makeYLabels(barChart, chartDimensions, options, data) {
  const yAxisLabelContainer = $('<div/>').appendTo(barChart).css(CSSClasses.yAxisLabelsContainer)
  if (options.yAxisTicks) {
    options.yAxisTicks.forEach(function (num, i, arr) {
      const height = i == arr.length - 1 ? 0 : arr[i + 1] - num;
      $('<div/>').appendTo(yAxisLabelContainer).css({...CSSClasses.yLabel,
        'font-size':options.fontSize,'height': String(height * chartDimensions.unitHeight) + chartDimensions.chartHeightUnits}).text(num + '-')
    });
  }
  else {
    const max = findMaximumBarHeight(data);
    const increment = getIncrement(max);
    for (let i = 0; i < max + increment; i += increment) {
      $('<div/>').appendTo(yAxisLabelContainer).css({...CSSClasses.yLabel,
        'font-size':options.fontSize,'height': String(increment * chartDimensions.unitHeight) + chartDimensions.chartHeightUnits}).text(i + '-')
    }
  }
}

function makeXLabels(barChart, chartDimensions, data, options) {
  const xAxis = $('<div/>').appendTo(barChart).css(CSSClasses.xAxis)
  data.forEach(value => {
    const label = value.label == undefined ? '' : value.label;
    $('<div/>').appendTo(xAxis).text(label)
    .css({...CSSClasses.xLabel, 'font-size':options.fontSize, 'width': (String(chartDimensions.barWidth) + chartDimensions.chartWidthUnits)})
  });
}

function makeTitles(barChart, options) {
  const title = options.title ? options.title : '';
  const xAxisTitle = options.xAxisTitle ? options.xAxisTitle : '';
  const yAxisTitleText = options.yAxisTitle ? options.yAxisTitle : '';
  const xAxisElement = $('<div/>').appendTo(barChart).css({...CSSClasses.xAxisTitle, 'font-size':options.axisTitleFontSize}).text(xAxisTitle);
  const yAxisElement = $('<div/>').appendTo(barChart).css(CSSClasses.yAxisTitleConatiner);
  const widthDiv = $('<div/>').appendTo(yAxisElement);
  const yAxisTitle = $('<div/>').appendTo(widthDiv).css({...CSSClasses.yAxisTitle, 'font-size':options.axisTitleFontSize}).text(yAxisTitleText);
  const chartTitle = $('<div/>').appendTo(barChart).css({...CSSClasses.chartTitle, 'font-size':options.titleFontSize}).text(title);
}



const CSSClasses = {
  barChart: {
    'background': 'rgb(226, 123, 226)',
    'border': 'black 1px solid',
    'display': 'grid',
    'grid-template-columns': '5% 5% 90%',
    'grid-template-rows': '10% 70% 10% 10%',
    'margin': 'auto'
  },
  chartTitle: {
    'grid-column': 'span 3',
    'grid-row': '1',
    'box-sizing': 'border-box',
    'margin': '0',
    'display': 'flex',
    'justify-content': 'space-around',
    'overflow': 'hidden'
  },
  xAxisTitle: {
    'grid-column': '3 / 4',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'overflow': 'hidden',
    'grid-row': '4'
  },
  yAxisTitleConatiner : {
    'display': 'flex',
    'align-items': 'center'
  },
  yAxisTitle : {
      'height':' 1.5em',
      'white-space':' nowrap',
      'margin-left':' -100%',
      'text-align':' center',
      'transform':' rotate(-90deg)',
      'transform-origin':' center',
      'position':' relative',
      'left':' 1em'
  },
  xAxis : {
    'display':'flex',
    'justify-content': 'space-around',
    'grid-column': '3',
    'grid-row': '3'
  },
  xLabel : {
    'text-align': 'center',
    'margin' : '0',
    'overflow' : 'hidden',
  },
  yAxisLabelsContainer: {
    'display':' flex',
    'flex-direction':' column-reverse',
    'position':' relative',
    'top':' 0.5em'
  },
  yLabel: {
    'margin':' 0',
    'padding':' 0',
    'flex':' none',
    'display':' flex',
    'flex-direction':' column-reverse',
    'align-items':' flex-end'
  },
  chart: {
    'border-left':' 1px solid black',
    'border-bottom':' 1px solid black',
    'box-sizing':' border-box',
    'display':' flex',
    'justify-content':' space-around',
    'align-items':' flex-end',
    'height':' 100%'
  },
  stackedBarContainer: {
    'display': 'flex',
    'flex-direction': 'column'
  },
  bar: {
    'width':' 50px',
    'display':' flex',
    'align-items':' center',
    'justify-content':' center',
    'overflow':' hidden',
    'box-sizing':' border-box'
  }
};

function main() {
  makeChart(data1, options1, $('#ex1'));
  makeChart(data2, options2, $('#ex2'));
}

$(document).ready(main());
