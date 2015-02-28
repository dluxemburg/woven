var utils = require('./utils')

exports.extractHAudio = function(doc){
  return utils.toArray(doc.getElementsByClassName("haudio"))
    .map(function(elem){
      return ["fn", "contributor", "album", "summary"]
        .reduce(function(memo,key){
          var val = utils.textForFirstElemByClass(elem, key)
          if (val) memo[key] = val
          return memo
        }, {})
    })
}