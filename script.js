
const chartHeight = 400 * 0.8;
const PERCENT_HEIGHT_FILLED = 0.9;

function loadData() {
  const data = [3, 4, 2, 5, 20, 14, 3, 13, 2, 17.53, 25];
  unitHeight = chartHeight * PERCENT_HEIGHT_FILLED / Math.max(...data);
  data.forEach(val => {
    $('#chart').append("<div class='bar' style='height:" + unitHeight * val + "px'></div>");
  });
}

$(document).ready(loadData());
