var MarsSurface = require("../models/MarsSurface");
var ControlCenter = require("../models/ControlCenter");
var Robot = require("../models/Robot");

// ===========================================================================
// Controller
// ===========================================================================
var Controller = function() {

	var _marsSurface = null;
	var _controlCenter = null;
	var _actingRobot = null;
	var _robotArray = new Array();

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
		_actingRobot = null;
	};

	this.report = function() {
		_robotArray.forEach(function(robot){
			robot.report();
		});
	};
}

module.exports = Controller;
