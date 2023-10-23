const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      }
      let processCommand = (object) => {
         if (object.commandType === 'MOVE') {
            if (this.mode !== 'LOW_POWER') {
               this.position = object.value;
               response.results.push({completed: true});
            } else {
               response.results.push({completed: false});
            }
            
         }
         if (object.commandType === 'STATUS_CHECK') {
            response.results.push({completed: true, roverStatus: {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
            });
            
         }
         if (object.commandType === 'MODE_CHANGE') {
            this.mode = object.value;
            response.results.push({completed: true});
         }
      };

      for (let i = 0; i < message.commands.length; i++) {
         processCommand(message.commands[i]);
      }

      return response;
   }
}


let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let testMessage = new Message('Test message with two commands', commands);
let testRover = new Rover(898989);

let response = testRover.receiveMessage(testMessage);

console.log(response);
console.log(response.message);

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let responseTest = rover.receiveMessage(message);
// console.log(message.commands[0]);

// console.log(responseTest);

module.exports = Rover;


//ReceiveMessage Function
// message parameter is an object.

// Test 8 - response returned by receiveMessage contains the name of the message

// Test 9 - response returned by receiveMessage includes two results if two commands are sent in the message”

/* Test 10

“responds correctly to the status check command”

    For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object — mode, generatorWatts, and position. The test should check each of these for accuracy.
    See the Rover Command Types table for more details.
*/

/* Test 11

“responds correctly to the mode change command”

    The test should check the completed property and rover mode for accuracy.
    The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.

Test 12

“responds with a false completed value when attempting to move in LOW_POWER mode”

    The test should check the completed property for accuracy and confirm that the rover’s position did not change.
    Use the Rover Modes table for guidance on how to handle move commands in different modes.

Test 13

“responds with the position for the move command”

    A MOVE command will update the rover’s position with the position value in the command.

*/





