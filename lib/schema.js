var utils = require("./utils")

var MATCH_ITEMS = "[itemscope]:not([itemprop])"

exports.extractSchemaItems = function(doc){
  var items = doc.querySelectorAll(MATCH_ITEMS)
  return utils.toArray(items).map(mapItem)
}

var mapItem = function(item){
  return reduceElements({
    itemtype: utils.getElemAttrVal(item, "itemtype")
  }, item.children)
}

var reduceElements = function(memo, elems){
  return utils.toArray(elems)
    .reduce(reduceElement, memo)
}

var reduceElement = function(memo, child){
  var prop, val
  if (!utils.elemHasAttr(child, "itemprop")) {
    reduceElements(memo, child.children)
  } else {
    prop = utils.getElemAttrVal(child, "itemprop")
    if (utils.elemHasAttr(child, 'itemscope')) {
      val = mapItem(child)
    } else {
      val = utils.getElemContent(child)
    }
    utils.setOrAddVal(memo, prop, val)
  }
  return memo
}
