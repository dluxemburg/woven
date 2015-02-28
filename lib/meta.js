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