var helper = require("../test-helper"),
    woven = require("../../lib/main.js"),
    expect = require("expect.js")

describe("MusicRecording", function(){

  var examples = {}
  before(helper.loadExample("last-fm", examples))

  it("is extracted from a last.fm page", function(){
    var extracted = woven.extractSchemaItems(examples["last-fm"])
    expect(extracted).to.have.length(1)
    expect(extracted[0].itemtype)
      .to.eql("http://schema.org/MusicRecording")
    expect(extracted[0].byArtist.name)
      .to.eql("Arcade Fire")
    expect(extracted[0].byArtist.itemtype)
      .to.eql("http://www.schema.org/MusicGroup")
  })

  describe("tacks", function(){
    before(helper.loadExample("last-fm-2", examples))
    it("are all extracted", function(){
      var title = "London Calling (disc 1: Original LP)"
      var extracted = woven.extractSchemaItems(examples["last-fm-2"])
      expect(extracted).to.have.length(1)
      expect(extracted[0].name).to.eql(title)
      expect(extracted[0].tracks).to.be.a(Array)
      expect(extracted[0].tracks.length).to.eql(19)
      expect(extracted[0].tracks[4].name)
        .to.eql("Rudie Can't Fail")
    })
  })

})