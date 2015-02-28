var helper = require("./test-helper"),
    expect = require("expect.js")

describe("Test helper", function(){

  var lastFmTitle = "Black Wave/Bad Vibrations — Arcade Fire — Last.fm"

  describe("#loadExampleHtml", function(){
    it("loads HTML from example file", function(done){
      helper.loadExampleHtml('last-fm', function(err, html){
        expect(html).to.contain(lastFmTitle)
        done(err)
      })
    })
  })

  describe("#loadExampleDom" ,function(){
    it("creates a DOM from example file", function(done){
      helper.loadExampleDom('last-fm', function(err, dom){
        var titleText = dom.getElementsByTagName('title')[0].innerHTML
        expect(titleText).to.eql(lastFmTitle)
        done(err)
      })
    })
  })

})