
const chartHeight = 400 * 0.8;
const PERCENT_HEIGHT_FILLED = 0.9;
const data = [45, 12, 21, 170.45235, 100, 125];

function makeChart(){
  const max = Math.max(...data);
  const increment = getIncrement(max);
  const unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / (increment * Math.ceil((max) / increment));
  loadData(unitHeight);
  makeYLabels(max, increment, unitHeight);
  makeXLabels();
}

function loadData(unitHeight) {
  data.forEach(val => {
    $('#chart').append("<div class='bar' style='height:" + unitHeight * val + "px'>" + val + "</div>");
  });
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
  data.forEach(val => {
    $('#x-axis').append("<p class='xlabel'>" + val + "</p>");
  });
}
function main() {
  makeChart();
}

$(document).ready(main());

