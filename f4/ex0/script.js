var mainEl = document.getElementsByTagName("main")[0];
var wordList = [
  "lorem",
  "ipsum",
  "rower",
  "kanapa",
  "telewizor",
  "samolot",
  "masny",
  "transkrypt",
  "laptop",
  "komputer",
  "talerz",
  "podkładka",
];

var points = 0;

function addPoints(val){
    points += val;
    document.getElementById('pkt').textContent = String(points);
}

function calculatePoints(text){
    if(parseInt(text)>=0)
        addPoints(parseInt(text));
    else{
        addPoints(text.length);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.getElementById("add").onclick = function () {
  if (getRandomInt(2) == 1) {
      var spanElement = document.createElement('span')
      spanElement.textContent = " " + wordList[getRandomInt(wordList.length)];
      spanElement.addEventListener('click',(ev)=>{
        calculatePoints(ev.target.textContent);
        ev.target.remove();
      })
      mainEl.children[getRandomInt(6)].appendChild(spanElement);
  } else {
    var spanElement = document.createElement('span')
    spanElement.textContent = " " + String(getRandomInt(wordList.length))
    spanElement.addEventListener('click',(ev)=>{
        calculatePoints(ev.target.textContent);
        ev.target.remove();
      })
    mainEl.children[getRandomInt(6)].appendChild(spanElement);
  }
};

document.getElementById("del").onclick = function () {
  var chosen = getRandomInt(6);
  mainEl.children[chosen].children[getRandomInt(mainEl.children[chosen].children.length)].remove();
};

for(var i = 0; i<100; i++){
  if (getRandomInt(2) == 1) {
    var spanElement = document.createElement('span')
    spanElement.textContent = " " + wordList[getRandomInt(wordList.length)];
    spanElement.addEventListener('click',(ev)=>{
      calculatePoints(ev.target.textContent);
      ev.target.remove();
    })
    mainEl.children[getRandomInt(6)].appendChild(spanElement);
} else {
  var spanElement = document.createElement('span')
  spanElement.textContent = " " + String(getRandomInt(wordList.length))
  spanElement.addEventListener('click',(ev)=>{
      calculatePoints(ev.target.textContent);
      ev.target.remove();
    })
  mainEl.children[getRandomInt(6)].appendChild(spanElement);
}
}

window.setInterval(function(){
  var chosen = getRandomInt(6);
  mainEl.children[chosen].children[getRandomInt(mainEl.children[chosen].children.length)].remove();
}, 1000)

window.setTimeout(function(){
  
},30000)