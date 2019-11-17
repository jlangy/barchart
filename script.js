
const chartHeight = 400 * 0.8;
const chartWidth = 600 * 0.9;
const DISTANCE_BETWEEN_BARS_PERCENT = 0.2;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [['one', [10,20,10]], ['two', [20,50]], ['three', 18]];
const options = {
  barColour: "red",
  barSpacing: 0.25,
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
  let dataWithLabelsRemoved = data.map(dataPoint => dataPoint[1]);
  let totalBarHeights = dataWithLabelsRemoved.map(barHeight => Array.isArray(barHeight) ? barHeight.reduce((a,b) => a+b) : barHeight);
  const max = Math.max(...totalBarHeights);
  return max;
}
function makeStackedBars(barHeights, unitHeight){
  let stackedBarsContainer = $("<div class='stackedBar'></div>");
  $('#chart').append(stackedBarsContainer);
  barHeights.forEach(height => {
    stackedBarsContainer.append("<div class='bar' style='height:" + unitHeight * height + "px'>" + height + "</div>");
  });
}

function loadData(unitHeight) {
  data.forEach(value => {
    const barHeight = value[1];
    if (Array.isArray(barHeight)) {
      makeStackedBars(barHeight, unitHeight);
    }
    else {
      $('#chart').append("<div class='bar' style='height:" + unitHeight * barHeight + "px'>" + barHeight + "</div>");
    }
  });
  const barWidth = chartWidth * (1 - options.barSpacing) / data.length;
  $('.bar').css({ "background-color": options.barColour, "color": options.labelColour });
  $('.bar, .xlabel').css("width", String(barWidth));
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
    $('#x-axis').append("<p class='xlabel'>" + value[0] + "</p>");
  });
}
function main() {
  makeChart();
}

$(document).ready(main());

