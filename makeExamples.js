const data1 = [3, 2, 5, 4, 3];
const options1 = {
  height: '400px',
  width: '500px',
  title: 'Simple Chart'
};


const data2 = [[3, 4], [3, 7, 4], 12, [3, 2]];
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
  barColour: 'red',
  labelColour: 'black'
};

const data3 = [{ data: [4, 3], colours: ['red', 'blue'], labelColours: ['black', 'white'], label: '2019' },
{ data: [2, 1, 2, 1], colours: ['red', 'blue', 'red', 'blue'], labelColours: ['black', 'white', 'black', 'white'], label: '2020' }];

const options3 = {
  height: '400px',
  width: '500px',
  backgroundColour: 'white',
  title: "Stacked Coloured Chart",
  titleFontSize: '1.5em',
  xAxisTitle: 'Domain',
  yAxisTitle: 'Range',
  axisTitleFontSize: '1.2em',
  fontSize: '1.2em',
  yAxisTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  barSpacing: 0.5,
  dataPosition: 'top'
};

const data = [45, 37, 56, 32]

const options = {
  height: '400px',
  width: '500px',
  backgroundColour: 'white',
  title: 'Sales',
  xAxisTitle: 'Quarter',
  yAxisTitle: 'Thousands(CAD)'
}

function main() {
  drawBarChart(data1, options1, document.getElementById('ex1'));
  drawBarChart(data2, options2, $('#ex2'));
  drawBarChart(data3, options3, $('#ex3'));
}

$(document).ready(main());
