/*jshint esversion: 6*/

const _ = require('underscore');
const Q = require('q');
const assert = require('assert');

//-- @TODO: include doc for class
class TestUtils {
  
  handleSpecPromiseException(err){
    assert.equals(err, null, 'Exceptions are not expected at this time:\n' + err);
    /*
    if (_.isString(err)){
      console.error(err);
    //} else if(err instanceof Error){
    //  console.error('Error:' + err);
    } else {
      assert.equals(err, null, 'Exceptions are not expected at this time:\n' + err);
    }
    */
  }
}

module.exports = new TestUtils();
