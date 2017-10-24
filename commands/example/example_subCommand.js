/*jshint esversion: 6*/

/**
 *  module
 *  @author [[firstname lastname]] <email>
**/
(function () {
  'use strict';
  
  module.exports = {
    topic: 'example',
    command: 'sub:command',
    description: 'Example sub-command',
    help: 'Note this command will appear in help as: template:example:sub:command',
    flags: [],
    
    run(context){
      console.log('Simply make the \'command\' name include colons to appear to be more than one topic deep');
    }
  };
}());