var expect = chai.expect;

var checkboxLS = document.getElementById("localstorage");
var txtArea = document.getElementById("txtArea");

const mapDatabase = new Map();
// localStorage.setItem('key', 'value');
// localStorage.getItem('key');
// localStorage.removeItem('key');

function buttonHandler(el) {
  var textAreaVal = txtArea.value;
  var input = textAreaVal.split(" ");
  inputHandler(input);
}

function inputHandler(input){
  if (input[0] == "dodaj") {
    var data = mapDatabase.get(input[1]);
    if (data == undefined || data.length == 0) {
      mapDatabase.set(input[1], parseInt(input[2]));
    } else {
      data = parseInt(input[2]) + data;
      mapDatabase.set(input[1], data);
    }

  } else if (input[0] == "wczytaj") {
    var data = mapDatabase.get(input[1]);
    if (data == undefined || data.length == 0) {
      window.alert("Wpis nie istnieje.");
    } else {
      window.alert(data);
    }

  } else if (input[0] == "usun") {
    var data = mapDatabase.get(input[1]);
    if (data == undefined || data.length == 0) {
      window.alert("Wpis nie istnieje.");
    } else {
      mapDatabase.delete(input[1]);
    }
    
  } else if (input[0] == "modyfikuj") {
    var data = mapDatabase.get(input[1]);
    if (data == undefined || data.length == 0) {
      window.alert("Wpis nie istnieje.");
    } else {
      mapDatabase.set(input[1], parseInt(input[2]));
    }
  }
}

// TODO: TESTS
describe("Input handler tests", function () {
  it("dodaj 5 razy", function () {
    var input = "dodaj polska 1";
    input = input.split(" ");
    inputHandler(input);
    inputHandler(input);
    inputHandler(input);
    inputHandler(input);
    inputHandler(input);
    expect(mapDatabase.get("polska")).to.equal(5);
  });

  it("dodaj usuń", function () {
    var input = "dodaj polska 1";
    input = input.split(" ");
    inputHandler(input);
    var input = "usun polska";
    input = input.split(" ");
    inputHandler(input);
    expect(mapDatabase.get("polska")).to.equal(undefined);
  });
  it("wczytaj puste", function () {
    var input = "wczytaj polska";
    input = input.split(" ");
    expect(mapDatabase.get("polska")).to.equal(undefined);
  });
});
