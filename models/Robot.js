var Geography = require("./Geography");
var MarsSurface = require("./MarsSurface");
var ControlCenter = require("./ControlCenter");
var util = require("util");

// init
var Point = Geography.Point;
var Direction = Geography.Direction;
var DIRECTIONTYPE = Geography.DIRECTIONTYPE;

// ===========================================================================
// 로봇 명령 클래스 : 로봇을 조종하는 로직을 구현한다.
// ===========================================================================
var RobotCommandBase = function(robot) {
	this._robot = robot;
	this.excute = function() {

	};
};

var RobotCommandLeft = function(robot) {
	RobotCommandBase.call(this,robot);
	this.excute = function() {
		this._robot.rotate(-90);
	}
}

var RobotCommandRight = function(robot) {
	RobotCommandBase.call(this,robot);
	this.excute = function() {
		this._robot.rotate(90);
	}
}

var RobotCommandForward = function(robot) {
	RobotCommandBase.call(this,robot);
	this.excute = function() {
		this._robot.move(1);
	}
}

util.inherits(RobotCommandLeft, RobotCommandBase);
util.inherits(RobotCommandRight, RobotCommandBase);
util.inherits(RobotCommandForward, RobotCommandBase);

// ===========================================================================
// 로봇 명령 제어기 : 문자열 명령을 분석하고 로봇 명령을 배열로 나엻한다.
// ===========================================================================

// 로봇 명령 타입
var ROBOTCOMMAND = {
	L : "L",
	R : "R",
	F : "F"
};

var RobotCommandController = function(robot) {
	var _robot = robot;

	this.excute = function (commandStr) {
		if(typeof commandStr !== 'string')
			return false;

		var commandCharArray = commandStr.split("");
		var commandObjectArray = new Array();

		commandCharArray.forEach(function(commandChar){
			switch(commandChar)
			{
				case ROBOTCOMMAND.L :
					commandObjectArray.push(new RobotCommandLeft(_robot));
					break;
				case ROBOTCOMMAND.R :
					commandObjectArray.push(new RobotCommandRight(_robot));
					break;
				case ROBOTCOMMAND.F :
					commandObjectArray.push(new RobotCommandForward(_robot));
					break;
			}
		});

		return commandObjectArray;
	};
};

// ===========================================================================
// 로봇 : 화성 로봇 
// ===========================================================================
var Robot = function(marsSurface, controlCenter) {
	var _commandController = new RobotCommandController(this);
	var _marsSurface = marsSurface;
	var _controlCenter = controlCenter;
	var _isConnected = true;

	this.setup = function(x, y, directionStr) {
		if(typeof x !== 'number')
			return false;
		if(typeof y !== 'number')
			return false;
		if(typeof directionStr !== 'string')
			return false;

		this._direction = new Direction(directionStr);
		if(!this._direction.isRight())
			return false;

		this._point = new Point(x, y);
		return true;
	};

	this.action = function(commandStr) {
		if(typeof commandStr !== 'string')
			return false;

		var commandObjectArray = _commandController.excute(commandStr);

		for(var i = 0; i < commandObjectArray.length; i++)
		{
			var commandObject = commandObjectArray[i];
			commandObject.excute();

			if(!_isConnected)
				return false;
		}

		return true;
	};

	this.rotate = function(angle) {
		this._direction.rotate(angle);
	};

	this.move = function(distanceInt) {
		var oriPoint = this._point;

		if(_controlCenter.isDangerArea(oriPoint, this._direction.directionType))
			return false;

		var newPoint = _marsSurface.getNewPoint(oriPoint, this._direction.directionType, distanceInt); 
		if(_marsSurface.isLost(newPoint))
		{
			_isConnected = false;
			_controlCenter.addMessage(oriPoint, this._direction.directionType);
		}
		else
		{
			this._point = newPoint;
		}

		return true;
	};

	this.report = function() {
		var reportStr = this._point.x + " "
						+ this._point.y + " "
						+ this._direction.directionType + " "
						+ (_isConnected ? "" : "LOST");

		console.log(reportStr);
	};
};

module.exports = Robot;