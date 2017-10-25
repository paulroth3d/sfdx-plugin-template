/*jshint esversion: 6*/

//-- include your modules
const DxConnectionMock = require('../mocks/DxConnection-mock');
const TestUtils = require('../mocks/TestUtils');
const JsForce = require('jsforce');
const JsForceUtil = require('../../lib/jsforce/JsForceUtil');
const _ = require('underscore');
const Q = require('q');
const fakeExec = require('fake-exec');
const assert = require('assert');
const sinon = require('sinon');

const DUMMY_DX_CONNECTION_RESPONSE = DxConnectionMock.DUMMY_DX_CONNECTION_RESPONSE;
const DEMO_ALIAS_NAME = DxConnectionMock.DUMMY_ALIAS_NAME;

const DUMMY_ALL_METADATA_TYPES = {'metadataObjects':[{'childXmlNames':['CustomLabel'],'directoryName':'labels','inFolder':false,'metaFile':false,'suffix':'labels','xmlName':'CustomLabels'},{'directoryName':'staticresources','inFolder':false,'metaFile':true,'suffix':'resource','xmlName':'StaticResource'},{'directoryName':'classes','inFolder':false,'metaFile':true,'suffix':'cls','xmlName':'ApexClass'},{'directoryName':'triggers','inFolder':false,'metaFile':true,'suffix':'trigger','xmlName':'ApexTrigger'}],'organizationNamespace':'','partialSaveAllowed':true,'testRequired':false};
const DUMMY_ALL_METADATA_MEMBERS = [{'createdById':'0051I000001GFU6XXX','createdByName':'John Doe','createdDate':'2017-10-06T17:30:49.000Z','fileName':'triggers/FSL__TR024_SkillRequirement_BeforeUpdate.trigger','fullName':'FSL__TR024_SkillRequirement_BeforeUpdate','id':'01q1I000000tESvQAM','lastModifiedById':'0051I000001GFUMQA4','lastModifiedByName':'John Doe','lastModifiedDate':'2017-10-18T09:46:02.000Z','manageableState':'installed','namespacePrefix':'FSL','type':'ApexTrigger'},{'createdById':'0051I000001GFTyXXX','createdByName':'John Doe','createdDate':'2017-10-06T17:30:49.000Z','fileName':'triggers/SCQuickSetup__ReasignCaseToQueue.trigger','fullName':'SCQuickSetup__ReasignCaseToQueue','id':'01q1I000000tET0XXX','lastModifiedById':'0051I000001GFTyXXX','lastModifiedByName':'John Doe','lastModifiedDate':'2017-10-06T17:30:49.000Z','manageableState':'installed','namespacePrefix':'SCQuickSetup','type':'ApexTrigger'},{'createdById':'0051I000000NKDzXXX','createdByName':'John Doe','createdDate':'2017-10-06T17:30:49.000Z','fileName':'triggers/insertNewWatchWordScheduler.trigger','fullName':'insertNewWatchWordScheduler','id':'01q1I000000tERHXXX','lastModifiedById':'0051I000000NKDzXXX','lastModifiedByName':'John Doe','lastModifiedDate':'2017-10-06T17:30:49.000Z','manageableState':'unmanaged','type':'ApexTrigger'}];



describe('lib/jsforce/JsForceUtil', function (){

  it('can leverage the DxConnectionMock', function(){
    const myConnection = new DxConnectionMock();
    assert.equal(myConnection.hasConnection(), true, 'should always be connected');
    assert.notEqual(myConnection.getConnection(), null, 'there should be a connection found');
    
    const resultConnection = myConnection.getConnection();
    assert.equal(resultConnection.instanceUrl, DUMMY_DX_CONNECTION_RESPONSE.result.instanceUrl, 'instance url must match the dummy login');
  });

  it('can leverage DxConnectionMock with Connection spy', function(){
    const dxConnection = new DxConnectionMock();
    const connection = dxConnection.getConnection();

    connection.metadata.list = function(queryObj, apiVersion, handler){
      console.log('---- !OOPS! you called a stub. SNAP!');
      handler(false, {name:'john doe'});
    };

    try {
      return JsForceUtil.getTypeMembers(dxConnection,'Documents')
        .then(function(results){
          console.log('Successfully got back results');
        });
    } catch(err){
      console.error('ERROR OCCURRED');
      assert.equal(err, null, 'no exceptions are expected to be thrown');
    }
  });

  it('can get all members', function(){
    this.timeout(10000);

    const dxConnection = new DxConnectionMock();
    const connection = dxConnection.getConnection();

    connection.metadata.list = function(queryObj, apiVersion, handler){
      //stub out call to salesforce
      handler(false, DUMMY_ALL_METADATA_MEMBERS);
    };

    try {
      return JsForceUtil.getTypeMembers(dxConnection,'Documents')
        .then(function(results){
          //-- successfully recieved the stub results
          assert.equal(results.length, 3, 'expecting 3 metadata members - from the stub');
        });
    } catch(err){
      console.error('ERROR OCCURRED');
      assert.equal(err, null, 'no exceptions are expected to be thrown');
    }
  });
  
  it('can get all types', function(){
    this.timeout(10000);
    
    const dxConnection = new DxConnectionMock();
    const connection = dxConnection.getConnection();

    connection.metadata.describe = function(apiVersion, handler){
      //stub out call to salesforce
      handler(false, DUMMY_ALL_METADATA_TYPES);
    };

    try {
      return JsForceUtil.getAllTypes(dxConnection)
        .then(function(results){
          //-- successfully recieved the stub results
          assert.equal(results.metadataObjects.length, 4, 'expecting 4 metadata types - from the stub');
        });
    } catch(err){
      console.error('ERROR OCCURRED');
      console.log(JSON.stringify(err,null,2));
      assert.equal(err, null, 'no exceptions are expected to be thrown');
    }
  });

  it('can print all the type names', function(){
    const allTypes = DUMMY_ALL_METADATA_TYPES;

    try {
      return JsForceUtil.printAllTypeNames(allTypes)
        .then(function(allTypeNameResults){
          //-- successfully recieved the stub results
          assert.equal(allTypeNameResults.length, 4, 'expecting 4 metadata types - from the stub');
        });
    } catch(err){
      console.error('ERROR OCCURRED');
      assert.equal(err, null, 'no exceptions are expected to be thrown');
    }
  });
  
  it('can print all the members', function(){
    const allMembers = DUMMY_ALL_METADATA_MEMBERS;

    try {
      return JsForceUtil.printMemberNames(allMembers)
        .then(function(allMemberResults){
          //-- successfully recieved the stub results
          assert.equal(allMemberResults.length, 3, 'expecting 3 metadata types - from the stub');
        });
    } catch(err){
      console.error('ERROR OCCURRED');
      assert.equal(err, null, 'no exceptions are expected to be thrown');
    }
  });

});