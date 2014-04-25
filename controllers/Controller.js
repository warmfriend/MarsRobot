var MarsSurface = require("../models/MarsSurface");
var ControlCenter = require("../models/ControlCenter");
var Robot = require("../models/Robot");

// ===========================================================================
// MarsRobotApp 
// ===========================================================================
var Controller = function() {

	var _marsSurface = null;
	var _controlCenter = null;
	var _robotArray = new Array();
	var _actingRobot = null;

	this.init = function(width, height) {
		_marsSurface = new MarsSurface(width, height);
		_controlCenter = new ControlCenter();
	};

	this.createRobot = function(x, y, directionStr){
		_actingRobot = new Robot(_marsSurface, _controlCenter);

		if(!_actingRobot.setup(parseInt(x), parseInt(y), directionStr))
			_actingRobot = null;
		else
		{	
			_robotArray.push(_actingRobot);
		}
	};

	this.command = function(commandStr) {
		if(!_actingRobot)
			return;

		_actingRobot.action(commandStr);
	};

	this.report = function() {
		_robotArray.forEach(function(robot){
			robot.report();
		});
	};
}

module.exports = Controller;
