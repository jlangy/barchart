
const chartHeight = 400 * 0.8;
const chartWidth = 600 * 0.9;
const DISTANCE_BETWEEN_BARS_PERCENT = 0.2;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [{label: 'some random data', data: [10,20,10], colours: ['red','white','blue'], labelColours: ['black', 'white', 'green']},
             {label: 'two', data: [20,50], labelColours: ['blue','rgb(0,255,255)'], colours: ['orange', 'purple']}, {label: 'three', data: 18}];
const DEFAULT_COLOUR = 'red';
const DEFAULT_LABEL_COLOUR = 'white';
             const options = {
  barSpacing: 0.5,
  labelColour: "black"
  // xAxisOverflow: hidden, shown, hover
  // xAxisTitle:
  // yAxisTitle:
}

function makeChart() {
  const max = findMaximumBarHeight();
  const increment = getIncrement(max);
  const unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / (increment * Math.ceil((max) / increment));
  makeXLabels();
  makeYLabels(max, increment, unitHeight);
  loadData(unitHeight);
}

function findMaximumBarHeight(){
  let dataWithLabelsRemoved = data.map(dataPoint => dataPoint.data);
  let totalBarHeights = dataWithLabelsRemoved.map(barHeight => Array.isArray(barHeight) ? barHeight.reduce((a,b) => a+b) : barHeight);
  const max = Math.max(...totalBarHeights);
  return max;
}
function makeStackedBars(barHeights, unitHeight, barColours, labelColours){
  let stackedBarsContainer = $("<div class='stackedBarContainer'></div>");
  $('#chart').append(stackedBarsContainer);
  barHeights.forEach((height, colourIndex) => {
      makeSingleBar(stackedBarsContainer, unitHeight, height, barColours, labelColours, colourIndex);
  });
}

function loadData(unitHeight) {
  data.forEach(value => {
    const barHeight = value.data;
    if (Array.isArray(barHeight)) {
      makeStackedBars(barHeight, unitHeight, value.colours, value.labelColours);
    }
    else {
      makeSingleBar($('#chart'), unitHeight, barHeight, value.colours, value.labelColours, 0);
    }
  });
  const barWidth = chartWidth * (1 - options.barSpacing) / data.length;
  $('.bar, .xlabel, .stackedBar').css("width", String(barWidth));
}

function makeSingleBar(container, unitHeight, barHeight, colours, labelColours, colourIndex){
  container.append("<div class='bar' style='height:" + unitHeight * barHeight + "px; background-color:" +
  (colours && colours[colourIndex] ? colours[colourIndex] : options.barColour ? options.barColour : DEFAULT_COLOUR) +
  "; color:" +
  (labelColours && labelColours[colourIndex] ? labelColours[colourIndex] : options.labelColour ? options.labelColour : DEFAULT_LABEL_COLOUR) +
  "'>" + barHeight + "</div>");
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

function makeYLabels(max, increment, unitHeight) {
  for (let i = 0; i < max + increment; i += increment) {
    $('#y-axis').append('<p class="label" style="height:' + increment * unitHeight + 'px">' + i + '-' + '</p>');
  }
}
function makeXLabels() {
  data.forEach(value => {
    $('#x-axis').append("<p class='xlabel'>" + value.label + "</p>");
  });
}
function main() {
  makeChart();
}

$(document).ready(main());

