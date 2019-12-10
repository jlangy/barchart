const data1 = [3,2,5,4,3];
const options1 = {
  height: '400px',
  width: '500px',
  title: 'Simple Chart',
  backgroundColour: 'Wheat'
}
const data2 = [[3,4], [1,2,1,4], 12, [3,2]];
const options2 = {
  height: '400px',
  width: '500px',
  barBorders: 'on',
  title: "Stacked Chart",
  titleFontSize: '2em',
  xAxisTitle: 'Domain',
  yAxisTitle: 'Range',
  axisTitleFontSize: '1em',
  fontSize: '1em',
  barColour: 'red'
}

const data3 = [{data: [4,3], colours: ['red', 'cyan'], labelColours: ['white', 'black'], label: '2019'},
               {data: [2,1,2,1], colours: ['red', 'cyan','red', 'cyan'], labelColours: ['white', 'black','white', 'black'], label: '2020'} ];

const options3 = {
  height: '400px',
  width: '500px',
  title: "Stacked Coloured Chart",
  titleFontSize: '2em',
  xAxisTitle: 'Domain',
  yAxisTitle: 'Range',
  axisTitleFontSize: '1.3em',
  fontSize: '.8em',
  yAxisTicks: [1,2,3,4,5,6,7,8],
  barSpacing: 0.5
}

function makeChart(data, options, element) {
  const barChartTemplate = getBarChartTemplate(options);
  const barChartOptionsStyles = {'height': String(options.height), 'width': String(options.width), 'background-color': options.backgroundColour}
  const barChart = $('<div class="barChart"/>').appendTo(element).css(Object.assign(CSSClasses.barChart,barChartOptionsStyles, barChartTemplate));
  const chartDimensions = getChartDimensions(data, options);
  options = Object.assign(options, {DEFAULT_COLOUR: 'black', DEFAULT_LABEL_COLOUR: 'white'})
  makeTitles(barChart,options);
  makeXLabels(barChart, chartDimensions, data, options);
  makeYLabels(barChart, chartDimensions, options, data);
  loadData(barChart, chartDimensions, data, options);
}

function getBarChartTemplate(options){
  if(options.xAxisTitle){
    if(options.yAxisTitle){
      return {'grid-template-columns': '7.5% 7.5% 85%', 'grid-template-rows': '10% 75% 7.5% 7.5%'}
    }
    return {'grid-template-columns': '0% 7.5% 92.5%', 'grid-template-rows': '10% 75% 7.5% 7.5%'}
  }
  if(options.yAxisTitle){
    return {'grid-template-columns': '7% 7% 86%', 'grid-template-rows': '10% 80% 10% 0%'}
  }
  return {'grid-template-columns': '0% 7.5% 92.5%','grid-template-rows': '10% 80% 10% 0%'}
}

function getUnitHeight(options,data) {
  const chartHeight = Number(options.height.match(/\d*\.*\d*/)[0]) * 0.7;
  if (options.yAxisTicks) {
    return chartHeight / Math.max(...options.yAxisTicks);
  } else {
    const max = findMaximumBarHeight(data);
    const increment = getIncrement(max);
    return chartHeight / (increment * Math.ceil((max) / increment));
  }
}

function findMaximumBarHeight(data) {
  let dataWithLabelsRemoved = data.map(dataPoint => dataPoint.data ? dataPoint.data : dataPoint);
  let totalBarHeights = dataWithLabelsRemoved.map(barHeight => Array.isArray(barHeight) ? barHeight.reduce((a, b) => a + b) : barHeight);
  const max = Math.max(...totalBarHeights);
  return max;
}

function makeStackedBars(chart, barHeights, chartDimensions, value, options) {
  const stackedBarsContainer = $("<div class=StackedBarContainer/>").appendTo(chart).css(CSSClasses.stackedBarContainer);
  barHeights.forEach((height, colourIndex) => {
    makeSingleBar(stackedBarsContainer, height, value, colourIndex, chartDimensions, options);
  });
}

function makeSingleBar(container, barHeight, value, colourIndex, chartDimensions, options) {
  const backGroundColour = (value.colours && value.colours[colourIndex] ? value.colours[colourIndex] : options.barColour ? options.barColour : options.DEFAULT_COLOUR);
  const dataPosition = options.dataPosition == 'top' ? 'flex-start' : options.dataPosition == 'bottom' ? 'flex-end' : 'center';
  const labelColour = (value.labelColours && value.labelColours[colourIndex] ? value.labelColours[colourIndex] : options.labelColour ? options.labelColour : options.DEFAULT_LABEL_COLOUR);
  let CSS = {...CSSClasses.bar, 'font-size': options.fontSize,
                  'height': String(chartDimensions.unitHeight * barHeight) + chartDimensions.chartHeightUnits, 'align-items': dataPosition,
                  'background-color': backGroundColour, 'color': labelColour,
                  'width': (String(chartDimensions.barWidth) + chartDimensions.chartWidthUnits)}
  if(options.barBorders == 'on'){
    CSS = Object.assign(CSS, {'border-left': '1px solid black','border-right': '1px solid black','border-top': '1px solid black'});
  }
  $('<div class=bar/>').appendTo(container).css(CSS).text(barHeight);
}

function loadData(barChart, chartDimensions, data, options) {
  const chart = $('<div class=chart/>').appendTo(barChart).css(CSSClasses.chart)
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
  const yAxisLabelContainer = $('<div class=yAxisLabelContainer/>').appendTo(barChart).css(CSSClasses.yAxisLabelsContainer)
  if (options.yAxisTicks) {
    options.yAxisTicks.forEach(function (num, i, arr) {
      let height = i == arr.length - 1 ? 0 : arr[i + 1] - num;
      let CSS = {...CSSClasses.yLabel,'font-size':options.fontSize,'height': String(height * chartDimensions.unitHeight) + chartDimensions.chartHeightUnits}
      if(i == 0){
        $('<div class=yAxisLabel/>').appendTo(yAxisLabelContainer).css({...CSSClasses.yLabel, 'height': String(num * chartDimensions.unitHeight) + chartDimensions.chartHeightUnits})
      }
      $('<div class=yAxisLabel/>').appendTo(yAxisLabelContainer).css(CSS).text(num + '-')
    });
  }
  else {
    const max = findMaximumBarHeight(data);
    const increment = getIncrement(max);
    for (let i = 0; i < max + increment; i += increment) {
      $('<div class=yAxisLabel/>').appendTo(yAxisLabelContainer).css({...CSSClasses.yLabel,
        'font-size':options.fontSize,'height': String(increment * chartDimensions.unitHeight) + chartDimensions.chartHeightUnits}).text(i + '-')
    }
  }
}

function makeXLabels(barChart, chartDimensions, data, options) {
  const xAxis = $('<div class=xAxis/>').appendTo(barChart).css(CSSClasses.xAxis)
  data.forEach(value => {
    const label = value.label == undefined ? '' : value.label;
    $('<div class=xAxisLabel/>').appendTo(xAxis).text(label)
    .css({...CSSClasses.xLabel, 'font-size':options.fontSize, 'width': (String(chartDimensions.barWidth) + chartDimensions.chartWidthUnits)})
  });
}

function makeTitles(barChart, options) {
  const titleText = options.title ? options.title : '';
  const xAxisTitleText = options.xAxisTitle ? options.xAxisTitle : '';
  const yAxisTitleText = options.yAxisTitle ? options.yAxisTitle : '';
  const yAxisElement = $('<div class=yAxisTitleContainer/>').appendTo(barChart).css(CSSClasses.yAxisTitleConatiner);
  const widthDiv = $('<div/>').appendTo(yAxisElement);
  $('<div class=xAxisTitle/>').appendTo(barChart).css({...CSSClasses.xAxisTitle, 'font-size':options.axisTitleFontSize}).text(xAxisTitleText);
  $('<div class=yAxisTitle/>').appendTo(widthDiv).css({...CSSClasses.yAxisTitle, 'font-size':options.axisTitleFontSize}).text(yAxisTitleText);
  $('<div class=Title/>').appendTo(barChart).css({...CSSClasses.chartTitle, 'font-size':options.titleFontSize}).text(titleText);
}

function getChartDimensions(data, options){
  const chartWidth = Number(options.width.match(/\d*\.*\d*/)[0]) * 0.9;
  const chartDimensions = {
    chartWidth: chartWidth,
    chartWidthUnits: options.width.match(/[a-zA-z]+/)[0],
    chartHeightUnits: options.height.match(/[a-zA-z]+/)[0],
    chartHeight: options.height.match(/\d*\.*\d*/)[0],
    barWidth: chartWidth * (1 - (options.barSpacing ? options.barSpacing : 0.2)) / data.length,
    unitHeight: getUnitHeight(options,data)
  }
  return chartDimensions;
}



const CSSClasses = {
  barChart: {
    'background': 'rgb(150,150,150)',
    'border': 'black 1px solid',
    'display': 'grid',
    'margin': 'auto',
    'overflow': 'hidden'
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
      'left':' 1em',
      'padding-bottom': '0.5em'
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
  makeChart(data3, options3, $('#ex3'));
}

$(document).ready(main());
