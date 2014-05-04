var Geography = require("./Geography");

// ===========================================================================
// Message 
// ===========================================================================
var Message = function(point, directionType) {
  var _point = point;
  var _directionType = directionType;

  this.isEqual = function(point, directionType) {
    if(point.x === _point.x && point.y === _point.y  && _directionType === directionType)
      return true;

    return false;
  };
}

module.exports = Message;