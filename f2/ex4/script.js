var expect = chai.expect;

var checkboxLS = document.getElementById("localstorage");
var txtArea = document.getElementById("txtArea");

var testerVar;

var db = {
  countries: {
    Poland: {
      vaccinations: 120,
      tests: 80,
      hospitalized: 60,
      confirmedCases: 40,
      confirmedDeaths: 30,
    },
    Germany: {
      vaccinations: 143,
      tests: 1565,
      hospitalized: 129,
      confirmedCases: 432,
      confirmedDeaths: 1111,
    },
  },
};

sessionStorage.setItem("localDb", JSON.stringify(db));

const mapDatabase = new Map();

function buttonHandler(el) {
  var textAreaVal = txtArea.value;
  var input = textAreaVal.split(" ");
  inputHandler(input);
}

function inputHandler(input) {
  var db;
  if (checkboxLS.checked) {
    db = JSON.parse(localStorage.getItem("localDb"));
  } else {
    db = JSON.parse(sessionStorage.getItem("localDb"));
  }
  if (input[0] == "add") {
    var data = db.countries[input[1]];
    if (data == undefined) {
      console.log("Entry does not exist.");
      return;
    }
    if (data[input[2]] != undefined) {
      console.log("Property already exists.");
      return;
    }
    db.countries[input[1]][input[2]] = 0;
    console.log("Successfully added new property.");
  } else if (input[0] == "get") {
    var data = db.countries[input[1]][input[2]];
    if (data == undefined) {
      console.log("Property does not exist.");
      testerVar = null;
      return;
    }
    testerVar = data;
    console.log(db.countries[input[1]][input[2]]);
  } else if (input[0] == "delete") {
    var data = db.countries[input[1]][input[2]];
    if (data == undefined) window.alert("Property does not exist.");
    delete db.countries[input[1]][input[2]];
    console.log("Successfully deleted property.");
  } else if (input[0] == "modify") {
    var data = db.countries[input[1]][input[2]];
    if (data == undefined) window.alert("Property does not exist.");
    db.countries[input[1]][input[2]] = parseInt(input[3]);
    console.log("Successfully modified property.");
  }
  if (checkboxLS.checked) localStorage.setItem("localDb", JSON.stringify(db));
  else{
    sessionStorage.setItem("localDb", JSON.stringify(db));
  } 
}
describe("Input handler tests", function () {
  console.log("-- == : : TESTS START : : == --")
  checkboxLS.checked = false;
  it("get test 1.", function () {
    var input = "get Poland tests";
    input = input.split(" ");
    inputHandler(input);
    expect(testerVar).to.equal(80);
  });

  it("get test 2.", function () {
    var input = "get Germany confirmedDeaths";
    input = input.split(" ");
    inputHandler(input);
    expect(testerVar).to.equal(1111);
  });

  it("add test", function () {
    var input = "add Poland tests2";
    input = input.split(" ");
    inputHandler(input);
    var input = "get Poland tests2";
    input = input.split(" ");
    inputHandler(input);
    expect(testerVar).to.equal(0);
  });
  it("delete test", function () {
    var input = "delete Poland tests";
    input = input.split(" ");
    inputHandler(input);
    var input = "get Poland tests";
    input = input.split(" ");
    inputHandler(input);
    expect(testerVar).to.equal(null);
  });
  it("add then delete", function () {
    var input = "add Poland tests2";
    input = input.split(" ");
    inputHandler(input);
    var input = "delete Poland tests2";
    input = input.split(" ");
    inputHandler(input);
    var input = "get Poland tests2";
    input = input.split(" ");
    inputHandler(input);
    expect(testerVar).to.equal(null);
  });
  
});
