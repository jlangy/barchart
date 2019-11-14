
const chartHeight = 400 * 0.8;
const chartWidth = 600 * 0.9;
const DISTANCE_BETWEEN_BARS_PERCENT = 0.2;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [['one', 24],['two', 20],['three', 18]];
const options = {
  barColour: "red",
  barSpacing: 0.25,
  labelColour: "black"
  // xAxisOverflow: hidden, shown, hover
  // xAxisTitle:
  // yAxisTitle:
}

function makeChart(){
  const values = data.map(array => array[1]);
  const max = Math.max(...values);
  const increment = getIncrement(max);
  const unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / (increment * Math.ceil((max) / increment));
  makeXLabels();
  makeYLabels(max, increment, unitHeight);
  loadData(unitHeight);
}

function loadData(unitHeight) {
  data.forEach(value => {
    $('#chart').append("<div class='bar' style='height:" + unitHeight * value[1] + "px'>" + value[1] + "</div>");
  });
  const barWidth = chartWidth * (1 - options.barSpacing) / data.length;
  $('.bar').css({"background-color": options.barColour, "color": options.labelColour});
  $('.bar, .xlabel').css("width",String(barWidth));
}

function getIncrement(num){
  const lastPower10 = 10 ** Math.floor(Math.log10(num));
  const increments = [lastPower10, lastPower10/2,lastPower10/4,lastPower10/10];
  for(let i = 0; i < increments.length; i++){
    if(num / increments[i] >= 4 && num / increments[i] <= 10){
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

