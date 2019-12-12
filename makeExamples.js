const data1 = [3, 2, 5, 4, 3];
const options1 = {
  height: '400px',
  width: '500px',
  title: 'Simple Chart',
  backgroundColour: 'Wheat'
}
const data2 = [[3, 4], [1, 2, 1, 4], 12, [3, 2]];
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

const data3 = [{ data: [4, 3], colours: ['red', 'cyan'], labelColours: ['white', 'black'], label: '2019' },
{ data: [2, 1, 2, 1], colours: ['red', 'cyan', 'red', 'cyan'], labelColours: ['white', 'black', 'white', 'black'], label: '2020' }];

const options3 = {
  height: '400px',
  width: '500px',
  title: "Stacked Coloured Chart",
  titleFontSize: '2em',
  xAxisTitle: 'Domain',
  yAxisTitle: 'Range',
  axisTitleFontSize: '1.3em',
  fontSize: '1em',
  yAxisTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  barSpacing: 0.5
};

function main() {
  drawBarChart(data1, options1, $('#ex1'));
  drawBarChart(data2, options2, $('#ex2'));
  drawBarChart(data3, options3, $('#ex3'));
}

$(document).ready(main());
