# sfdx-plugin-template 

A template for making Salesforce DX Plugins

# Steps to make your plugin

1. Install the SDFX CLI.

2. Fork and Clone this repository: `git clone git@github.com:paulroth3d/sfdx-plugin-template.git`

3. Install npm modules: `npm install`

4. Link the plugin, so it is available for local testing: `sfdx plugins:link .` <br /> (you should now see the plugin when you run `sfdx --help` or executing locally)

5. Develop your plugin (detail below)

6. Publish the plugin to npm, so it is available directly to end users: <br /> `sfdx plugins:install [[your_npm_package_name]]`


# Developing your plugin

There are three main parts to creating a plugin:

**1. Define a plugin Namespace**

This is defined within index.js and is the name that people see when listing all plugins or when executing any command.

**2. Define plugin topics**

Topics are the high level collections for organizing
your plugin commands.
 
The list of all topics for a plugin can be found
by running:

	sfdx [[pluginNamespace]] --help

for example:

	#list the topics
	sfdx template --help

**3. Define and Reference Command Modules**

Commands are node module excutables that implement your plugin's functionality.

Command modules implement the following:

	module.exports = {
	  //-- which topic is the command found within
	  topic: 'example',
	
	  //-- the name of the command that this responds to
	  command: 'sayHello',
	
	  //-- description as listed from `sfdx template:example:sayHello --help`
	  description: 'description of the command',
	  help: 'Secondary help message',
	
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
	
	    //-- whether the flag requires additional information to be useful.
	    //-- For example (true): --msg "Polly want a cracker"
	    //-- as opposed to flags that indicate some condition
	    //-- For example (false): --json
	    //-- takes no argument
	    hasValue: true
	  }],
	  
	  /**
	   * The actual implementation of the command.
	   * @param {any} context - sfdx command context
	   */
	  run(context){
	  	//-- it is recommended the run returns a promise
	  	//-- this is useful for testing / combining
	  	//-- but it is not required
	  }
	}

# Features available:

* Code linting: `npm run lint`
  * Lint just commands `npm run lintCommands`
  * Actively lint Commands on save: `npm run watchCommands`
  * Actively lint and run tests on save: `npm run watchTests`
* Unit testing `npm run test`
* Code Coverage `npm run codeCoverage`

# Continuing the conversation

For more information, please see the following:

[Become a SFDX CLI Ninja](https://www.youtube.com/watch?v=dWUQOy2qdTc&t=7m40s)