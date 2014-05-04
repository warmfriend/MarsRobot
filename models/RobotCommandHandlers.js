var RobotCommandHandlers = {};

RobotCommandHandlers.robotCommandLeft = function(robot) {
  robot.rotate(-90);
};

RobotCommandHandlers.robotCommandRight = function(robot) {
  robot.rotate(90);
};

RobotCommandHandlers.robotCommandForward = function(robot) {
  robot.move(1);
};

module.exports = RobotCommandHandlers;