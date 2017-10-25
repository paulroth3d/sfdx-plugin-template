/*jshint esversion: 6*/

const _ = require('underscore');
const Q = require('q');
const JsForce = require('jsforce');

const DUMMY_ALIAS_NAME = 'testAlias';

const DUMMY_DX_CONNECTION_RESPONSE = {
  'status': 0,
  'result': {
    'username': 'username@domain.com',
    'id': '00D1I000001X7IHUA1',
    'connectedStatus': 'Connected',
    'accessToken': '00D1I00XXX1X7IH!abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuvwxyz01234567890abcdefghijklmnopqrstuv',
    'instanceUrl': 'https://some-demo-org.my.salesforce.com',
    'clientId': 'SalesforceDevelopmentExperience',
    'alias': 'df17'
  }
};

//-- @TODO: include doc for class
class DxConnectionMock {

  /**
   * Constructor
   * @param {any} connection - the example connection object to leverage
   */
  constructor(connection){
    if (!connection){
      connection = new JsForce.Connection({
        instanceUrl: DUMMY_DX_CONNECTION_RESPONSE.result.instanceUrl,
        accessToken: DUMMY_DX_CONNECTION_RESPONSE.accessToken
      });
    }

    this.connection = connection;
  }

  hasConnection(){
    return true;
  }

  getConnection(){
    return this.connection;
  }

  refreshConnection(alias){
    return this.connection;
  }
}

module.exports = DxConnectionMock;
DxConnectionMock.DUMMY_DX_CONNECTION_RESPONSE = DUMMY_DX_CONNECTION_RESPONSE;
DxConnectionMock.DUMMY_ALIAS_NAME = DUMMY_ALIAS_NAME;