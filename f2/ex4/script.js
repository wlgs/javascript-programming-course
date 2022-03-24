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

describe("TEST1", function () {
  it("DESCRIBE", function () {
    expect(4).to.equal(4);
  });
});
