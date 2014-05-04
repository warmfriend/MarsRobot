var Controller = require("./controllers/Controller");
var View = require("./views/View");

// ===========================================================================
// MarsRobotApp 
// ===========================================================================
var MarsRobotApp = function() {};

MarsRobotApp.play = function(inputStr) {
  var controller = new Controller();
  var view = new View(controller);

  view.input(inputStr);
  view.printInput();
  view.printOutput();
};

module.exports = MarsRobotApp;