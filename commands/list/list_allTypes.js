/*jshint esversion: 6*/

const _ = require('underscore');
const Q = require('q');
const DxConnection = require('../../lib/dx/DxConnection');
const JsForceUtil = require('../../lib/jsforce/JsForceUtil');

/**
* Cleans the request, defaults flags as necessary
* and ensures required flags / values are sent.
* 
* @param {any} config - the Salesforce DX command context. 
* @returns 
*/
function cleanContext(config){

  if (config.flags){
    config = config.flags;
  }

  config = _.defaults(config, {
  });

  if (!config.alias){
    throw('--alias is required');
  }

  return (config);
}

/**
 *  module
 *  @author Paul Roth <proth@salesforce.com>
**/
(function (){
  'use strict';
  
  module.exports = {
    
    //-- which topic is the command found within
    topic: 'list',
    
    //-- the name of the command that this responds to
    command: 'allTypes',
    
    //-- description as listed from `sfdx template:example:sayHello --help`
    description: 'Manually adds an item to a packageList',
    help: 'Manually adds an item to a packageList',
    
    //-- list of flags that are available for the command.
    //-- These can also be found by running
    //-- `sfdx template:example:sayHello --help`
    flags: [{
      
      //-- the full text name of the command
      name: 'alias',
      
      //-- alternate one character flag name
      char: 'a',
      
      //-- a description for what the argument represents
      description: 'Connection alias',
      
      //-- declares we want the name of the alias
      hasValue: true
    }],

    //-- expose any methods that should be tested
    //-- it is recommended only cleaner
    //-- or printer functions exist within the command.
    cleanContext: cleanContext,

    //-- stub connection to use for testing
    stubConnection: null,
    
    /**
     * The actual implementation of the command.
     * 
     * @param {any} context - sfdx command context
     */
    run(context){
      
      //-- it is recommended that run also returns a promise
      //-- so it can be leveraged within integration tests.
      const deferred = Q.defer();

      //-- uncomment to store the context within an integration test.
      //console.log(JSON.stringify(context)); return deferred.promise;

      try {
        //-- clean the context provided
        //-- default values
        //-- and ensure items required flags are present
        context = cleanContext(context);
      } catch(err){
        console.error(JSON.stringify(err, null, 2));
        deferred.reject(err);
        return (deferred.promise);
      }

      //-- allow stubbing for unit tests.
      let dxConnection = this.stubConnection ? this.stubConnection : new DxConnection();
      
      //-- utilize DX under the sheets to get an access token.
      dxConnection.refreshConnection(context.alias)
        .then(function(jsForce){
          //console.log('connection established');

          //-- get all metadata types based on the active access token.
          return (JsForceUtil.getAllTypes(dxConnection));
          //return JsForceUtil.getTypeMembers(dxConnection,'ApexTrigger');
        })
        .then(function(allTypesResults){
          //console.log('all metadata types found:' + allTypesResults.length);

          //-- determine a list of the names of those metadata types

          return (JsForceUtil.printAllTypeNames(allTypesResults));
        })
        .then(function(allTypeNames){
          //-- all members have been printed

          deferred.resolve(allTypeNames);
        })
        .catch(function(errObj){

          //-- show the error message if it is sent
          console.error('An error occurred while listing all types');

          if (_.isString(errObj)){
            console.error(errObj);
          } else {
            //-- further inspect the error
            
            //-- uncomment the following to get a pretty print of the error object.
            //console.error(JSON.stringify(errObj, null, 2));
          }
        });
      
      return (deferred.promise);
    }
  };
}());