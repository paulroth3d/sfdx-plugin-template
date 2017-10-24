/*jshint esversion: 6*/
const exampleSayHello = require('./commands/example/example_sayHello');
const exampleSubCommand = require('./commands/example/example_subCommand');
const listAllTypes = require('./commands/list/list_allTypes');

/**
 * This is the Main file of the plugin.
 * 
 * <p>It defines, the namespace of the plugin
 *    (Found when running: `sfdx --help`),
 * The Top-Level Topics
 *    (Found when running: `sfdx [[pluginName]] --help`)
 * And the list of all commands (modules)
 * that can be run.</p>
 * 
 * <p>Please note: Each command self-aligns
 *   to the topic that it falls within</p>
 */
(function () {
  'use strict';
  
  /**
   * The namespace name is the functional name of your plugin
   *   and is the name that people see when listing all plugins
   *   or when executing the command.
   */
  exports.namespace = {
    name: 'template',
    description: 'Description of the namespace, defined within index.js'
  };
  
  /**
   * Topics are the high level collections for organizing
   * your plugin commands.
   * 
   * The list of all topics for a plugin can be found
   * by running:
   * `sfdx [[pluginNamespace]] --help`
   * for example:
   * `sfdx template --help` will list these topics.
   */
  exports.topics = [{
    name:'example',
    description: 'Description of the Example topic, defined within index.js',
  },{
    name:'list',
    description: 'Description of the List topic, defined within index.js',
  }];
  
  /**
   * An array of command modules used in the plugin.
   * 
   * Commands are the module excutables that implement
   * your plugin's functionality.
   */
  exports.commands = [
    
    //-- example
    exampleSayHello,
    exampleSubCommand,

    //-- list
    listAllTypes
  ];
}());