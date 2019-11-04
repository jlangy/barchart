
const chartHeight = 400 * 0.8;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [3, 4, 5, 7, 17.53, 2];
const unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / Math.max(...data);

//Need to fiugre out how to calculate this based on input chart height and number of values
const Y_SPACING = 6;

function loadData() {
  data.forEach(val => {
    $('#chart').append("<div class='bar' style='height:" + unitHeight * val + "px'></div>");
  });
}

function makeLabels() {
  //Currently assuming positive data
  const top = Math.max(...data) / PERCENT_HEIGHT_FILLED;
  const ySpacing = Math.round(top / Y_SPACING);
  for (let i = 0; i <= top; i += ySpacing) {
    $('#y-axis').append('<p class="label" style="height:' + ySpacing * unitHeight + 'px">' + i + '-' + '</p>');
  }
}

function main() {
  loadData();
  makeLabels();
}

$(document).ready(main());
