
const chartHeight = 400 * 0.8;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [300, 400, 900, 600, 1700, 200];
const unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / Math.max(...data);

//Need to fiugre out how to calculate this based on input chart height and number of values
const Y_SPACING = 6;

function loadData() {
  data.forEach(val => {
    $('#chart').append("<div class='bar' style='height:" + unitHeight * val + "px'>" + val + "</div>");
  });
}

function makeYLabels() {
  //Currently assuming positive data
  const top = Math.max(...data) / PERCENT_HEIGHT_FILLED;
  const ySpacing = Math.round(top / Y_SPACING);
  for (let i = 0; i <= top; i += ySpacing) {
    $('#y-axis').append('<p class="label" style="height:' + ySpacing * unitHeight + 'px">' + i + '-' + '</p>');
  }
}
function makeXLabels() {
  data.forEach(val => {
    $('#x-axis').append("<p class='xlabel'>" + val + "</p>");
  });
}
function main() {
  loadData();
  makeYLabels();
  makeXLabels();
}

$(document).ready(main());
