const PERCENT_HEIGHT_FILLED = 0.95;
const data = [[4, 1], { label: 'hi', data: [7, 1, 2], colours: ['blue', 'white'], labelColours: ['white', 'green'] }, { data: [3], colours: ['white'] }, 4, 5];
const DEFAULT_COLOUR = 'red';
const DEFAULT_LABEL_COLOUR = 'white';
const options = {
  height: '400px',
  width: '700px',
  dataPosition: "center",
  barSpacing: 0.4,
  barBorders: 'off',
  title: "Data",
  titleFontSize: '1.5em',
  titleFontColour: 'Blue',
  xAxisTitle: 'Domain',
  yAxisTitle: 'range',
  axisTitleFontSize: '1.2em',
  labelColour: "red",
  fontSize: '1em',
  yAxisTicks: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10]
}

{/* <div id="bar-chart">
    <h2 id="chart-title">Chart Title</h2>
    <div id='y-axis-title-container'>
      <div>
        <div id='y-axis-title'>y axis title</div>
      </div>
    </div>
    <div class='axis' id="y-axis"></div>
    <div id="chart">
    </div>
    <div class='axis' id="x-axis"></div>
    <div id="x-axis-title">x axis title</div>
  </div>` */}

function makeChart(element) {
  let $barChart = $('<div/>').appendTo(element).css({
    'height': String(options.height),
    'width': String(options.width),
    'height': '400px',
    'width': '600px',
    'background': 'rgb(226, 123, 226)',
    'border': 'black 1px solid',
    'display': 'grid',
    'grid-template-columns': '5% 5% 90%',
    'grid-template-rows': '10% 70% 10% 10%',
    'margin': 'auto'
  });
  makeTitles($barChart);
  // const chartWidth = Number(options.width.match(/\d*\.*\d*/)[0]) * 0.9;
  // const barWidth = chartWidth * (1 - options.barSpacing) / data.length;
  // const unitHeight = getUnitHeight();
  // makeXLabels();
  // makeYLabels(unitHeight);
  // loadData(unitHeight);
  // setBarStyles(barWidth);
  // setFontStyles();
}

function setFontStyles() {
  const fontSizeNumber = options.fontSize.match(/\d*\.*\d*/)[0];
  const fontSizeUnits = options.fontSize.match(/[a-zA-z]+/)[0];
  $('.label, .bar, .xlabel').css('font-size', options.fontSize);
  $('#y-axis-title, #x-axis-title').css('font-size', options.axisTitleFontSize);
  $('#y-axis').css('top', String(0.5 * Number(fontSizeNumber)) + fontSizeUnits);
}

function getUnitHeight() {
  const chartHeight = Number(options.height.match(/\d*\.*\d*/)[0]) * 0.7;
  if (options.yAxisTicks) {
    return chartHeight * PERCENT_HEIGHT_FILLED / Math.max(...options.yAxisTicks);
  } else {
    const max = findMaximumBarHeight();
    const increment = getIncrement(max);
    return chartHeight * PERCENT_HEIGHT_FILLED / (increment * Math.ceil((max) / increment));
  }
}

function findMaximumBarHeight() {
  let dataWithLabelsRemoved = data.map(dataPoint => dataPoint.data ? dataPoint.data : dataPoint);
  let totalBarHeights = dataWithLabelsRemoved.map(barHeight => Array.isArray(barHeight) ? barHeight.reduce((a, b) => a + b) : barHeight);
  const max = Math.max(...totalBarHeights);
  return max;
}

function makeStackedBars(barHeights, unitHeight, barColours, labelColours) {
  let stackedBarsContainer = $("<div class='stackedBarContainer'></div>");
  $('#chart').append(stackedBarsContainer);
  barHeights.forEach((height, colourIndex) => {
    makeSingleBar(stackedBarsContainer, unitHeight, height, barColours, labelColours, colourIndex);
  });
}

function makeSingleBar(container, unitHeight, barHeight, colours, labelColours, colourIndex) {
  container.append("<div class='bar' style='height:" + unitHeight * barHeight + "px; background-color:" +
    (colours && colours[colourIndex] ? colours[colourIndex] : options.barColour ? options.barColour : DEFAULT_COLOUR) +
    "; color:" +
    (labelColours && labelColours[colourIndex] ? labelColours[colourIndex] : options.labelColour ? options.labelColour : DEFAULT_LABEL_COLOUR) +
    "'>" + barHeight + "</div>");
}

function loadData(unitHeight) {
  data.forEach(value => {
    const barHeight = value.data ? value.data : value;
    if (Array.isArray(barHeight)) {
      makeStackedBars(barHeight, unitHeight, value.colours, value.labelColours);
    }
    else {
      makeSingleBar($('#chart'), unitHeight, barHeight, value.colours, value.labelColours, 0);
    }
  });
}

function setBarStyles(barWidth) {
  $('.bar, .xlabel').css("width", String(barWidth));
  let dataPosition = options.dataPosition;
  dataPosition = dataPosition == 'top' ? 'flex-start' : dataPosition == 'bottom' ? 'flex-end' : 'center';
  $('.bar').css("align-items", dataPosition);
  if (options.barBorders == 'on') {
    $('.bar').css({ 'border-left': '1px solid black', 'border-right': '1px solid black', 'border-top': '1px solid black' });
  }
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

function makeYLabels(unitHeight) {
  if (options.yAxisTicks) {
    options.yAxisTicks.forEach(function (num, i, arr) {
      const height = i == arr.length - 1 ? 0 : arr[i + 1] - num;
      $('#y-axis').append('<p class="label" style="height:' + height * unitHeight + 'px">' + num + '-' + '</p>');
    });
  }
  else {
    const max = findMaximumBarHeight();
    const increment = getIncrement(max);
    for (let i = 0; i < max + increment; i += increment) {
      $('#y-axis').append('<p class="label" style="height:' + increment * unitHeight + 'px">' + i + '-' + '</p>');
    }
  }
}

function makeXLabels() {
  data.forEach(value => {
    const label = value.label == undefined ? '' : value.label;
    $('#x-axis').append("<p class='xlabel'>" + label + "</p>");
  });
}

function makeTitles(barChart) {
  const title = options.title ? options.title : '';
  const xAxisTitle = options.xAxisTitle ? options.xAxisTitle : '';
  const yAxisTitle = options.yAxisTitle ? options.yAxisTitle : '';
  const xAxisElement = $('<div/>').appendTo(barChart).css({
    'grid-column': '3 / 4',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'overflow': 'hidden',
    'grid-row': '3'
  }).text(xAxisTitle);
  const yAxisElement = $('<div/>').appendTo(barChart).css({
    'height': '1.5em',
    'white-space': 'nowrap',
    'margin-left': '-100%',
    'text-align': 'center',
    'transform': 'rotate(-90deg)',
    'transform-origin': 'center',
    'position': 'relative',
    'left': '1em'
  }).text(yAxisTitle);
  const chartTitle = $('<div/>').appendTo(barChart).css({
      'grid-column': 'span 3',
      'grid-row': '1',
      'box-sizing': 'border-box',
      'margin': '0',
      'display': 'flex',
      'justify-content': 'space-around',
      'overflow': 'hidden'
  }).text(title);
  // $('#chart-title').text(title);
  // $('#chart-title').css({ 'font-size': options.titleFontSize, 'color': options.titleFontColour });
}

function main() {
  makeChart($('#ex1'));
}

$(document).ready(main());

