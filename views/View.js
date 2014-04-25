var Controller = require("../controllers/Controller");

// ===========================================================================
// View
// ===========================================================================
var View = function(controller) {

	var _inputStr = null;
	var _controller = controller;

	// analyze 'inputStr' and call controller's method.
	this.input = function(inputStr) {
		if(typeof inputStr !== "string")
			return;

		_inputStr = inputStr;

		var inputArray = inputStr.split("\n");
		var inputFirstLineArray = inputArray.shift().split(" ");

		_controller.init(inputFirstLineArray[0], inputFirstLineArray[1]);

		var MAX_ROBOT_SETUP_COMMAND_COUNT = 3;
		var MAX_ROBOT_COMMAND_STRING_COUNT = 100;

		for(var i = 0 ; i < inputArray.length; i++)
		{
			var input = inputArray[i];
			if( i % 2 === 0)
			{
				var inputSetupCommandArray = input.split(" ");
				if(inputSetupCommandArray.length == MAX_ROBOT_SETUP_COMMAND_COUNT)
					_controller.createRobot(inputSetupCommandArray[0], inputSetupCommandArray[1], inputSetupCommandArray[2]);
			}
			else
				_controller.command(input.substring(0,MAX_ROBOT_COMMAND_STRING_COUNT));	
		}
	};

	this.printInput = function() {
		console.log("#Input#");
		console.log(_inputStr);
		console.log("");
	};

	this.printOutput = function() {
		console.log("#Output#");
		_controller.report();
	};
};

module.exports = View;