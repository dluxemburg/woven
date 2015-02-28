var helper = require("../test-helper"),
    woven = require("../../lib/main.js"),
    expect = require("expect.js")

describe("Person", function(){

  var examples = {}
  before(helper.loadExample("nested", examples))

  it("is extracted from a nested example", function(){
    var extracted = woven.extractSchemaItems(examples["nested"])
    expect(extracted).to.have.length(2)
    expect(extracted[0].itemtype)
      .to.eql("http://data-vocabulary.org/Person")
    expect(extracted[0].name)
      .to.eql("Bob Smith")
    expect(extracted[0].address.region).to.eql("NM")
    expect(extracted[0].address.itemtype)
      .to.eql("http://data-vocabulary.org/Address")
  })
})