var Geography = function() {

};

Geography.Point = function(x, y){
	var _x = x
	var _y = y;

	Object.defineProperty(this,"x",{
    	get: function() { return _x; },
    	set: function(x) { _x = x; }
  	});
  	Object.defineProperty(this,"y",{
    	get: function() { return _y; },
    	set: function(y) { _y = y; }
  	});
};

Geography.DIRECTIONTYPE = {
	N : "N",
	S : "S",
	W : "W",
	E : "E"
};

Geography.Direction = function(directionStr) {
	// private ====================================================

	var setAngle = function(angle) {
		return angle < 0 ? 360 + angle % 360 : angle % 360;
	};

	var directionToAngle = function(directionType){
		var returnValue = -1;
		switch(directionType) {
			case Geography.DIRECTIONTYPE.N :
				returnValue = 0;
				break;
			case Geography.DIRECTIONTYPE.S :
				returnValue = 180;
				break;
			case Geography.DIRECTIONTYPE.W :
				returnValue = 270;
				break;
			case Geography.DIRECTIONTYPE.E :
				returnValue = 90;
				break;
		}
		return returnValue;
	};

	var angleToDirection = function(angle){
		var returnValue = null;
		switch(angle) {
			case 0:
				returnValue = Geography.DIRECTIONTYPE.N;
				break;
			case 180 :
				returnValue = Geography.DIRECTIONTYPE.S;
				break;
			case 270 :
				returnValue = Geography.DIRECTIONTYPE.W;
				break;
			case 90 :
				returnValue = Geography.DIRECTIONTYPE.E;
				break;
		}
		return returnValue;
	};

	var _directionType = null;
	var _angle = -1;

	for(var type in Geography.DIRECTIONTYPE) {
		if(type === directionStr)
			_directionType = directionStr;		
	}
	_angle = directionToAngle(directionStr);

	// public ====================================================
	this.rotate = function(angle) {
		var tmpAngle = setAngle(_angle + angle);
    	var tmpDir = angleToDirection(tmpAngle);
		if(tmpDir)
		{
			_directionType = tmpDir;
			_angle = tmpAngle;
		}
	};

	this.isRight = function() {
		if(!_directionType)
			return false;
		return true;
	};

	Object.defineProperty(this,"directionType",{
    	get: function() { return _directionType; },
  	});
  	Object.defineProperty(this,"angle",{
    	get: function() { return _angle; },
    	set: function(angle) { 
    		var tmpAngle = setAngle(angle); 
    		var tmpDir = angleToDirection(tmpAngle);
    		if(tmpDir)
    		{
    			_directionType = tmpDir;
    			_angle = tmpAngle;
    		}
    	}
  	});
};

module.exports = Geography;