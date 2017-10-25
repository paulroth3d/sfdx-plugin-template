/*jshint esversion: 6*/

//-- include your modules
const DxConnection = require('../../lib/dx/DxConnection');
const DxConnectionMock = require('../mocks/DxConnection-mock');
const _ = require('underscore');
const Q = require('q');
const fakeExec = require('fake-exec');
const child_process = require('child_process');
var assert = require('assert');

const DUMMY_DX_CONNECTION_RESPONSE = DxConnectionMock.DUMMY_DX_CONNECTION_RESPONSE;

function generateDxConnectionExecCall(alias){
  return `sfdx force:org:display -u ${alias} --json`;
}

const DEMO_ALIAS_NAME = 'testAlias';

describe('lib/dx/DxConnection', function (){

  it('verify the mock exec call matches', function(done){
    const expectedCall = 'sfdx force:org:display -u testAlias --json';
    const testAlias = 'testAlias';
    const resultCall = generateDxConnectionExecCall(testAlias);
    assert.equal(resultCall, expectedCall, 'exec call stub generation must match expected results');
    done();
  });

  it('refreshing stores the connection in DxConnection', function(){
    this.timeout(10000);

    try {
      const expectedExecCall = generateDxConnectionExecCall(DEMO_ALIAS_NAME);
      //assert.equals(expectedExecCall, 'sfdx force:org:display -u testAlias --json', 'last verification that the exec call must match');
      fakeExec(expectedExecCall, JSON.stringify(DUMMY_DX_CONNECTION_RESPONSE));

      const myConnection = new DxConnection();
      return myConnection.refreshConnection(DEMO_ALIAS_NAME)
        .then(function(connectionResponse){
          assert.notEqual(connectionResponse, null, 'connectionResponse should not be null');
          assert.notEqual(myConnection.getConnection(), null, 'getConnection() must not be null after successfully refreshing connection');
          assert.equal(myConnection.hasConnection(), true, 'a connection must be found after the connection is refreshed');

          //for (var field in connectionResponse){
          //  console.log('found field:' + field);
          //}
          
          assert.equal(connectionResponse.instanceUrl, DUMMY_DX_CONNECTION_RESPONSE.result.instanceUrl, 'instance url must be from the dummy');
        });
    } catch(err){
      console.error('error occurred while setting the fake exec');
      console.error(JSON.stringify(err,null,2));
    }
  });

  it('should throw exception if alias is not sent', function(done){
    this.timeout(10000);

    try {
      const expectedExecCall = generateDxConnectionExecCall(DEMO_ALIAS_NAME);
      //assert.equals(expectedExecCall, 'sfdx force:org:display -u testAlias --json', 'last verification that the exec call must match');
      fakeExec(expectedExecCall, JSON.stringify(DUMMY_DX_CONNECTION_RESPONSE));

      const myConnection = new DxConnection(DxConnection.DEFAULT_API_VERSION);
      return myConnection.refreshConnection()
        .then(function(connectionResponse){
          assert.equal(false, true, 'Was expected that there should be an exception thrown');
        })
        .catch(function(err){
          done();
        });

    } catch(err){
      console.error('error occurred while setting the fake exec');
      console.error(JSON.stringify(err,null,2));
      done();
    }
  });

});