"use strict";
/**

Let's begin with PURE `node` style.

*/

/** Note: node-require handles json just as you would expect */
const schema = require("../schema.json");

const ajv = new require("ajv")();
function validate (data, schema) {
  var valid = ajv.validate(schema, data);
  return {valid, errors:  ajv.errors || []};
}

class Something {
  constructor(config) {
    debugger;
    const validation = validate(config, schema);
    if (!validation.valid) {
      throw new Error(validation.errors);
    }
    this.someField = config.someField;
    this.style = "pure-node";
  }
  do () {
    console.log(`my field is: ${this.someField}`);
    return this.someField;
  }
}

const something = new Something({someField: "aValue"});
module.exports = {something: something};
