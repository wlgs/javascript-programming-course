var numberEl = document.getElementsByTagName('input')[0];
var number = parseInt(numberEl.value);
var allSpans = document.getElementsByTagName("span");

function updateSpans(){
    for (var i=0, max=allSpans.length; i < max; i++) {
        allSpans[i].textContent = number;
    }
}


window.setInterval(function(){
    number = numberEl.value;
    if (number==0)
        return
    number--;
    numberEl.value = number;
    updateSpans();
},1000)

updateSpans();