

function loadData(){
  const data = [3, 4, 2, 5];
  data.forEach(val => {
    $('#chart').append("<div class='bar'></div>");
  });
}

$(document).ready(loadData());
