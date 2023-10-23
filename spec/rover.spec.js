const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // test 7
  test("constructor sets position and default values for mode and generatorWatts", () => {
    let testRover = new Rover(797979);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  })
  // test 8
  test("response returned by receiveMessage contains the name of the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with two commands', commands);
    let testRover = new Rover(898989);
    let response = testRover.receiveMessage(testMessage);
    expect(console.log(response.message)).toBe(testMessage.message);
  })

  // test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with two commands', commands);
    let testRover = new Rover(909090);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results.length).toEqual(commands.length);
  });

  // test 10
  test("responds correctly to the status check command", () => {
    let commands = [new Command('MOVE', 123456), new Command('STATUS_CHECK')];
    let testMessage = new Message('Checking status check ability', commands);
    let testRover = new Rover(101010);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results[1].roverStatus).toEqual({mode: 'NORMAL', generatorWatts: 110, position: 123456});
  })
  // test 11

  test("responds correctly to the mode change command", () => {
    let commands = [ new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 123456), new Command('STATUS_CHECK')];
    let testMessage = new Message('Checking mode change', commands);
    let testRover = new Rover(111111);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results[0].roverStatus).toEqual({mode: 'NORMAL', generatorWatts: 110, position: 111111});
    expect(response.results[0].completed).toBe(true);
    expect(response.results[2].completed).toBe(false);
    expect(response.results[3].completed).toBe(true);
    expect(response.results[3].roverStatus).toEqual({mode: 'LOW_POWER', generatorWatts: 110, position: 111111});
  })

  // test 12

  test("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [ new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 123456), new Command('STATUS_CHECK')];
    let testMessage = new Message('Checking rover does not move during low power', commands);
    let testRover = new Rover(121212);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results[1].roverStatus).toEqual({mode: 'LOW_POWER', generatorWatts: 110, position: 121212});
    expect(response.results[1].completed).toBe(true);
    expect(response.results[2].completed).toBe(false);
    expect(response.results[3].completed).toBe(true);
    expect(response.results[3].roverStatus).toEqual({mode: 'LOW_POWER', generatorWatts: 110, position: 121212});
    expect(testRover.mode).toBe('LOW_POWER');
  })

  // test 13

  test("responds with the position for the move command", () => {
    let commands = [ new Command('STATUS_CHECK'), new Command('MOVE', 123456), new Command('STATUS_CHECK')];
    let testMessage = new Message('Checking rovers move command', commands);
    let testRover = new Rover(131313);
    let response = testRover.receiveMessage(testMessage);
    expect(testRover.position).toBe(123456);
  })


});
