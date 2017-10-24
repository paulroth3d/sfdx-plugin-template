/*jshint esversion: 6*/
const Q = require('q');

/**
 *  A very simple command that simply echos out
 *  a message that was passed by the flags.
 *  
 *  @author [[firstname lastname]] <email>
**/
(function () {
  'use strict';
  
  module.exports = {
    
    //-- which topic is the command found within
    topic: 'example',

    //-- the name of the command that this responds to
    command: 'sayHello',

    //-- description as listed from `sfdx template:example:sayHello --help`
    description: 'Minimal example of a module command / parrots a message',
    help: 'Parrots a message. See here for more info: https://www.youtube.com/watch?v=dWUQOy2qdTc&t=7m40s',

    //-- list of flags that are available for the command.
    //-- These can also be found by running
    //-- `sfdx template:example:sayHello --help`
    flags: [{
      
      //-- the full text name of the command
      name: 'msg',
      
      //-- alternate one character flag name
      char: 'm',
      
      //-- a description for what the argument represents
      description: 'What message to say',

      //-- whether the flag requires additional information
      //-- to be useful.
      //-- For example: --msg "Polly want a cracker"
      //-- as opposed to flags that indicate some condition
      //-- for example: --json
      hasValue: true
    }],
    
    /**
     * The actual implementation of the command.
     * 
     * @param {any} context - sfdx command context
     */
    run(context){

      //-- it is recommended that run also returns a promise
      //-- so it can be leveraged within integration tests.
      const deferred = Q.defer();

      //-- flags contain the arguments sent by the user.
      //-- the names and types of flags sent are configured
      //-- within the export.flags array defined above.
      const flags = context.flags;

      if (!flags.msg){
        flags.msg = 'Hello';
      }
      
      const result = 'Polly says:"' + flags.msg + '". Bawk.';
      console.log(result);

      deferred.resolve(result);

      return deferred.promise;
    }
  };
}());