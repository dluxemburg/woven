(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.woven = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
exports.extractSchemaItems = _dereq_('./schema').extractSchemaItems
exports.extractDocumentMeta = _dereq_('./meta').extractDocumentMeta
exports.extractHAudio = _dereq_('./microformats').extractHAudio

},{"./meta":2,"./microformats":3,"./schema":4}],2:[function(_dereq_,module,exports){
var utils = _dereq_("./utils")

exports.extractDocumentMeta = function(doc){
  return utils.toArray(doc.getElementsByTagName('meta'))
    .reduce(function(memo, e){
      if(e.name) {
        memo[e.name] = e.content
      } else if(utils.elemHasAttr(e, 'property')) {
        memo[utils.getElemAttrVal(e, 'property')] = e.content
      } else if(utils.elemHasAttr(e, 'itemprop')) {
        memo[utils.getElemAttrVal(e, 'itemprop')] = e.content
      }
      return memo
    }, {})
}
},{"./utils":5}],3:[function(_dereq_,module,exports){
var utils = _dereq_('./utils')

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
},{"./utils":5}],4:[function(_dereq_,module,exports){
var utils = _dereq_("./utils")

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

},{"./utils":5}],5:[function(_dereq_,module,exports){
exports.getElemContent = function(elem){
  if (exports.elemHasAttr(elem, "content")) {
    return exports.getElemAttrVal(elem, "content")
  } else {
    return elem.textContent.trim()
  }
}

exports.elemHasAttr = function(elem, attr){
  return elem.attributes[attr] != undefined
}

exports.getElemAttrVal = function(elem, attr){
  if (!exports.elemHasAttr(elem, attr)) return
  return elem.attributes[attr].value
}

exports.toArray = function(arr){
  return Array.prototype.slice.call(arr)
}

exports.setOrAddVal = function(target, key, val){
  if (!target[key]) {
    target[key] = val
  } else if(!Array.isArray(target[key])){
    target[key] = [target[key]]
    target[key].push(val)
  } else {
    target[key].push(val)
  }
  return target
}

exports.firstElemByClass = function(doc, klass){
  return doc.getElementsByClassName(klass)[0]
}

exports.textForFirstElemByClass = function(doc, klass){
  var elem = exports.firstElemByClass(doc, klass)
  if (elem) return elem.textContent.trim()
}


// exports.extractText = function(elem) {
//   if (elem.firstChild) {
//     return exports.extractText(elem.firstChild)
//   } else {
//     return elem.textContent
//   }
// }

// exports.isNodeList = function(obj){
//   return /HTMLCollection/.test(obj.toString())
// }
},{}]},{},[1])(1)
});