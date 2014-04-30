var RobotCommandHandlers = require("./RobotCommandHandlers");

// ===========================================================================
// RobotCommandController : analyze command string and create RobotCommandHandler's array.
// ===========================================================================

// robot command type
ROBOTCOMMANDTYPE = {
	L : "L",
	R : "R",
	F : "F"
};

var RobotCommandController = function() {
	var _handle = {};
	_handle[ROBOTCOMMANDTYPE.L] = RobotCommandHandlers.robotCommandLeft;
	_handle[ROBOTCOMMANDTYPE.R] = RobotCommandHandlers.robotCommandRight;
	_handle[ROBOTCOMMANDTYPE.F] = RobotCommandHandlers.robotCommandForward;

	this.excute = function (commandStr) {
		if(typeof commandStr !== 'string')
			return false;

		var commandCharArray = commandStr.split("");
		var robotCommandArray = new Array();

		commandCharArray.forEach(function(commandChar){
			if(typeof _handle[commandChar] !== "function")
				return;

			robotCommandArray.push(_handle[commandChar]);
		});

		return robotCommandArray;
	};
};

module.exports = RobotCommandController;