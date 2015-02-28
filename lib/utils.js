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