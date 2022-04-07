import { pieChart, barChart} from "./lib.js";

var currentData = []
var currentLabels = []

document.getElementById('btn').addEventListener("click", (ev)=>{
    var newLabel = document.getElementById('label').value;
    var newValue = parseInt(document.getElementById('value').value);

    currentData.push(newValue);
    currentLabels.push(newLabel);

    document.getElementById('canv1cont').innerHTML = ''
    document.getElementById('canv2cont').innerHTML = ''
    document.getElementById('canv1cont').innerHTML ='<canvas id="canvas2137" width="300" height="300" style="border: 1px solid black"></canvas>'
    document.getElementById('canv2cont').innerHTML ='<canvas id="canvas2138" width="300" height="300" style="border: 1px solid black"></canvas>'

    pieChart(document.getElementById('canvas2137'), currentData, currentLabels);
    barChart(document.getElementById('canvas2138'), currentData, currentLabels);


})

// pieChart(document.getElementById('canvas2137'),[70,220,130],['val1', 'val2', 'val3'])
// barChart(document.getElementById('canvas2138'),[70,220,130],['val1', 'val2', 'val3'])