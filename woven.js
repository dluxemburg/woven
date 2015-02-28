(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.extractSchemaItems = require('./schema').extractSchemaItems
exports.extractDocumentMeta = require('./meta').extractDocumentMeta
exports.extractHAudio = require('./microformats').extractHAudio

},{"./meta":2,"./microformats":3,"./schema":4}],2:[function(require,module,exports){
var utils = require("./utils")

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
},{"./utils":5}],3:[function(require,module,exports){
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
},{"./utils":5}],4:[function(require,module,exports){
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

},{"./utils":5}],5:[function(require,module,exports){
exports.getElemContent = function(elem){
  if (exports.elemHasAttr(elem, "content")) {
    return exports.getElemAttrVal(elem, "content")
  } else {
    return elem.textContent
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
},{}]},{},[1]);
