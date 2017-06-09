"use strict";
/**

Webpackable to a `.jsm`

- Cu.import still works for FIREFOX things.
- `require` has node semantics during build for LOCAL / node things.
- single-file output .jsm
*/

const {utils: Cu} = Components;

/** Note: node-require handles json just as you would expect */
const schema = require("../schema.json");

const Ajv = require("ajv");
const ajv = new Ajv();
function validate (data, schema) {
  var valid = ajv.validate(schema, data);
  return {valid, errors:  ajv.errors || []};
}

// logging to show that imported `.jsm` still works
const log = (function makeLogger() {
  Cu.import("resource://gre/modules/Log.jsm");
  const log = Log.repository.getLogger("something");
  log.addAppender(new Log.ConsoleAppender(new Log.BasicFormatter()));
  log.level = Log.Level.Debug;
})();

class Something {
  constructor(config) {
    const validation = validate(config, schema);
    if (!validation.valid) {
      throw new Error(validation.errors);
    }
  }
  do () {
    log.debug(`my field is: ${this.someField}`);
    return this.someField;
  }
}

// replace all the EXPORTS with `this` things.
this.something = new Something({someField: aValue});
this.EXPORTED_SYMBOLS = ["something"];
