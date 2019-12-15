const data1 = [
  {
    data: [7, 10, 6],
    label: "Q1",
    colours: ['black', 'white'],
    labelColours: ['white', 'black']
  },
  {
    data: [6,14, 3],
    label: "Q2",
    colours: ['black', 'white'],
    labelColours: ['white', 'black']
  },
  {
    data: [10, 12, 4],
    label: "Q3",
    colours: ['black', 'white'],
    labelColours: ['white', 'black']
  },
  {
    data: [3, 6, 3],
    label: "Q4",
    colours: ['black', 'white'],
    labelColours: ['white', 'black']
  }
];
const options1 = {
  height: '500px',
  width: '600px',
  backgroundColour: 'wheat',
  title: 'Sales: p1 (black) vs p2 (white) vs p3(red)',
  titleFontColour: 'Red',
  xAxisTitle: 'Quarter',
  yAxisTitle: 'Thousands (CAD)',
  titleFontSize: '1.5em',
  barSpacing: 0.4,
  axisTitleFontSize: '1.2em',
  yAxisTicks: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30],
  barBorders: 'on',
  dataPosition: 'top',
  barColour: 'red',
  labelColour: 'black',
  dataPosition: 'top'
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

const data3 = [{ data: [4, 3], colours: ['red', 'cyan'], labelColours: ['white', 'black'], label: 'A really really long x axis label that overflows' },
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
  drawBarChart(data1, options1, document.getElementById('ex1'));
  drawBarChart(data2, options2, $('#ex2'));
  drawBarChart(data3, options3, $('#ex3'));
}

$(document).ready(main());
