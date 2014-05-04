var Geography = require("./Geography");

// init
var Point = Geography.Point;
var DIRECTIONTYPE = Geography.DIRECTIONTYPE;

// ===========================================================================
// MarsSurface 
// ===========================================================================
var MarsSurface = function(width, height) {

  var _width = MarsSurface.MAX_WIDTH < width ? MarsSurface.MAX_WIDTH : width;
  var _height = MarsSurface.MAX_HEIGHT < height ? MarsSurface.MAX_HEIGHT : height;

  this.getNewPoint = function(point, directionType, distanceInt) {
    
    var returnPoint = new Point(point.x, point.y);
    switch(directionType) {
      case DIRECTIONTYPE.N:
        returnPoint.y = point.y + distanceInt;
        break;
      case DIRECTIONTYPE.S:
        returnPoint.y = point.y - distanceInt;
        break;
      case DIRECTIONTYPE.W:
        returnPoint.x = point.x - distanceInt;
        break;
      case DIRECTIONTYPE.E:
        returnPoint.x = point.x + distanceInt;
        break;
    }

    return returnPoint;
  };

  this.isLost = function(point) {
    if((point.x < 0 || point.x > _width) || (point.y < 0 || point.y > _height))
      return true;

    return false;
  };

  Object.defineProperty(this,"width",{
        get: function() { return _width; }
    });
    Object.defineProperty(this,"height",{
        get: function() { return _height; }
    });
};

MarsSurface.MAX_WIDTH = 50;
MarsSurface.MAX_HEIGHT = 50;

module.exports = MarsSurface;
