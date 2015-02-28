var helper = require("../test-helper"),
    woven = require("../../lib/main.js"),
    expect = require("expect.js")

describe("MusicRecording", function(){

  var examples = {}
  before(helper.loadExample("last-fm", examples))

  it("is extracted from a last.fm page", function(){
    var extracted = woven.extractSchemaItems(examples["last-fm"])
    expect(extracted).to.have.length(3)
    expect(extracted[0].itemtype)
      .to.eql("http://schema.org/MusicRecording")
    expect(extracted[0].byArtist.name)
      .to.eql("Arcade Fire")
  })

})