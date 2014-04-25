var MarsRobotApp = require("./MarsRobotApp");


// ===========================================================================
// unittest : add method tested.
// ===========================================================================
var unittest = {

	test1 : function() {
		var inputString = "5 3 \n" +
				"1 1 E \n" +
				"RFRFRFRF ";
		MarsRobotApp.play(inputString);
	},

	test2 : function() {
		var inputString = "5 3 \n" +
				"1 1 E \n" +
				"RFRFRFRF \n" +
				"3 2 N \n" +
				"FRRFLLFFRRFLL \n" +
				"0 3 W \n" +
				"LLFFFLFLFL ";
		MarsRobotApp.play(inputString);		
	},
}

var index = 0;
for(var test in unittest) {
	index++;

	console.log("####### UNIT TEST " + index + " #######\n");
	unittest[test]();

	console.log("\n");
}