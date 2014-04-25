var Controller = require("../controllers/Controller");

var View = function(controller) {

	var _inputStr = null;
	var _controller = controller;


	this.input = function(inputStr) {
		if(typeof inputStr !== "string")
			return;

		_inputStr = inputStr;

		var inputArray = inputStr.split("\n");
		var inputFirstLineArray = inputArray.shift().split(" ");

		_controller.init(inputFirstLineArray[0], inputFirstLineArray[1]);

		for(var i = 0 ; i < inputArray.length; i++)
		{
			var input = inputArray[i];
			if( i % 2 === 0)
			{
				var inputSettingArray = input.split(" ");
				if(inputSettingArray.length > 3)
					_controller.createRobot(inputSettingArray[0], inputSettingArray[1], inputSettingArray[2]);
			}
			else
				_controller.command(input);	
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