var helper = require("./test-helper"),
    woven = require("../lib/main.js"),
    expect = require("expect.js")

describe("Page meta", function(){

  var examples = {}
  before(helper.loadExample("last-fm", examples))
  before(helper.loadExample("meta-small", examples))

  it("is extracted from a last.fm page", function(){
    var meta = woven.extractDocumentMeta(examples["last-fm"])
    expect(meta["og:site_name"]).to.eql("Last.fm")
    expect(meta.name).to.eql("Neon Bible")
  })

  it("is extracted from small contrived example", function(){
    var meta = woven.extractDocumentMeta(examples["meta-small"])
    expect(meta["og:title"]).to.eql("I Am a Teapot")
    expect(meta["not-real-property"]).to.eql("418")
  })

})