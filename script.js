
const chartHeight = 400 * 0.8;
const chartWidth = 600 * 0.9;
const DISTANCE_BETWEEN_BARS_PERCENT = 0.2;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [{label: 'some random data', data: [12,20,10, 30], colours: ['red','white','blue']},
             {label: 'two', data: [20,50]}, {label: 'three', data: 18}];
const DEFAULT_COLOUR = 'red';
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
function makeStackedBars(barHeights, unitHeight, barColours){
  let stackedBarsContainer = $("<div class='stackedBarContainer'></div>");
  $('#chart').append(stackedBarsContainer);
  barHeights.forEach((height, barColourIndex) => {
    if(barColours && barColours[barColourIndex]){
      stackedBarsContainer.append("<div class='stackedBar' style='height:" + unitHeight * height + "px; background-color:" + barColours[barColourIndex] + ";'>" + height + "</div>");
    }
    else if(options.barColour){
      stackedBarsContainer.append("<div class='stackedBar' style='height:" + unitHeight * height + "px; background-color:" + options.barColour + ";'>" + height + "</div>");
    }
    else{
      stackedBarsContainer.append("<div class='stackedBar' style='height:" + unitHeight * height + "px; background-color:" + DEFAULT_COLOUR + ";'>" + height + "</div>");
    }
  });
}

function loadData(unitHeight) {
  data.forEach(value => {
    const barHeight = value.data;
    if (Array.isArray(barHeight)) {
      makeStackedBars(barHeight, unitHeight, value.colours);
    }
    else {
      makeSingleBar(unitHeight, barHeight, value.colours);
    }
  });
  $('.bar, .stackedBar').css({"color": options.labelColour});
  const barWidth = chartWidth * (1 - options.barSpacing) / data.length;
  $('.bar, .xlabel, .stackedBar').css("width", String(barWidth));
}

function makeSingleBar(unitHeight, barHeight, colours){
  if(colours){
    $('#chart').append("<div class='bar' style='height:" + unitHeight * barHeight + "px; background-color:" + value.colours[0] + ";'>" + barHeight + "</div>");
  }
  else if(options.barColour){
    $('#chart').append("<div class='bar' style='height:" + unitHeight * barHeight + "px; background-color:" + options.barColour + ";'>" + barHeight + "</div>");
  }
  else{
    $('#chart').append("<div class='bar' style='height:" + unitHeight * barHeight + "px; background-color:" + DEFAULT_COLOUR + ";'>" + barHeight + "</div>");
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

