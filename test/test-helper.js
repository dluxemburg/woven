var fs = require('fs'),
    jsdom = require('jsdom')

var loadExampleHtml = exports.loadExampleHtml = function(name, fn){
  fs.readFile(__dirname+"/examples/"+name+".html", "utf8", fn)
}

var loadExampleDom = exports.loadExampleDom = function(name, fn){
  loadExampleHtml(name, function(err, html){
    if (err) return fn(err)
    fn(null, jsdom.jsdom(html, {
      FetchExternalResources: false,
      ProcessExternalResources: false
    }))
  })
}

var loadExample = exports.loadExample = function(name, examples){
  return function(done){
    loadExampleDom(name, function(err, dom){
      if (err) return done(err)
      examples[name] = dom
      done()
    })
  }
}