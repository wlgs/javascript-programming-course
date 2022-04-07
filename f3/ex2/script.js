var SetIntervalTime = [];
var SetTimeoutTime = [];
var n = 20;
var delay;

var visualize = 1;

var intervalId;
var timeoutId;

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Interval', 'Timeout'],
        datasets: [{
            label: 'AVG time',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 0]
        }]
    },

    // Configuration options go here
    options: {}
});



function doTimeConsumingCallculationsWithSetInterval(){
    SetIntervalTime = SetIntervalTime.concat(performance.now())
    if (SetIntervalTime.length > n)
        SetIntervalTime.shift();
    calculatePrimes(50, 1000000000);
    console.log('[INTERVAL]: calculated primes');
}

function doTimeConsumingCallculationsWithSetTimeout(){
    SetTimeoutTime = SetTimeoutTime.concat(performance.now())
    if (SetTimeoutTime.length > n)
        SetIntervalTime.shift();
    calculatePrimes(50, 1000000000);
    console.log('[TIMEOUT]: calculated primes');
    timeoutId = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, delay);
}

function calculateAvg(array){
    var total = 0;

    for (var i = 0; i < array.length-1; i++){
        total = total + array[i+1]-array[i]
    }
    return total/array.length-1;
}

function drawChart(){
    if (SetIntervalTime.length>1 && SetTimeoutTime.length>1){
        chart.data.datasets[0].data[0] = calculateAvg(SetIntervalTime);
        chart.data.datasets[0].data[1] = calculateAvg(SetTimeoutTime);
        chart.update();
    }

    if (visualize)
        window.requestAnimationFrame(drawChart);
}


function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

function start(){
    console.log('Started')
    visualize = 1;
    delay = parseInt(document.getElementById('delay').value);
    
    intervalId = window.setInterval(doTimeConsumingCallculationsWithSetInterval, delay);
    window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, delay);
    
    window.requestAnimationFrame(drawChart);
}

function stop(){
    console.log('Stopped')
    visualize = 0;
    clearInterval(intervalId);
    clearInterval(timeoutId);
}

document.getElementById('btnstart').onclick = start;
document.getElementById('btnstop').onclick = stop;