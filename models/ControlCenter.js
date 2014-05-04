var Geography = require("./Geography");
var Message = require("./Message");

// ===========================================================================
// ControlCenter : manage robot's activity.
// ===========================================================================
var ControlCenter = function() {

  var _messageArray = new Array();

  this.addMessage = function(point, directionType) {
    _messageArray.push(new Message(point, directionType));
  };

  this.isDangerArea = function(point, directionType) {
    for(var i = 0 ; i < _messageArray.length ; i++)
    {
      var message = _messageArray[i];
      if(message.isEqual(point, directionType))
        return true;
    }

    return false;
  };
};

module.exports = ControlCenter;