var helper = require("../test-helper"),
    woven = require("../../lib/main.js"),
    expect = require("expect.js")

describe("hAudio", function(){

  var examples = {}
  before(helper.loadExample("wikipedia", examples))
  before(helper.loadExample("h-audio", examples))

  it("is extracted from a Wikipedia page", function(){
    var extracted = woven.extractHAudio(examples["wikipedia"])
    expect(extracted).to.have.length(1)
    expect(extracted[0].contributor)
      .to.eql("Explosions in the Sky")
    expect(extracted[0].summary)
      .to.eql("Take Care, Take Care, Take Care")
  })

  it("is extracted from a spec example", function(){
    var extracted = woven.extractHAudio(examples["h-audio"])
    expect(extracted).to.have.length(1)
    expect(extracted[0].fn)
      .to.eql("Start Wearing Purple")
    expect(extracted[0].contributor)
      .to.eql("Gogol Bordello")
    expect(extracted[0].album)
      .to.eql("Underdog World Strike")
    expect(extracted[0].summary).to.be(undefined)
  })


})