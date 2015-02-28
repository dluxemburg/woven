var utils = require("./utils")

exports.extractSchemaItems = function(doc){
  return utils.toArray(doc.querySelectorAll("[itemtype]"))
    .map(mapElement)
}

var mapElement = function(elem){
  return utils.toArray(elem.querySelectorAll("[itemprop]"))
    .reduce(function(memo, itemprop){
      var prop = utils.getElemAttrVal(itemprop, "itemprop")
      if (utils.elemHasAttr(itemprop, 'itemtype')) {
        memo[prop] = mapElement(itemprop)
      } else {
        memo[prop] = utils.getElemContent(itemprop)
      }
      return memo
    }, {
      itemtype: utils.getElemAttrVal(elem, "itemtype")
    })
}
