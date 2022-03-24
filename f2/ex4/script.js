var expect = chai.expect;

function buttonHandler(el) {
  var textAreaVal = el.parentElement.children[0].value
  console.log(textAreaVal)

}

describe("TEST1", function () {
  
  it("DESCRIBE", function () {
    expect(4).to.equal(4);
  });
});
