"use strict";
/**

Cu.import style!

Here, there are some pitfalls.

- we had to convert BOTH `ajv` and `schemas.json` into jsm files
- it's no longer a 'single-file' version.  Instead you need a whole directory.
- we have to remember to 'unload' from the caller scope.

Good things:
- depends ONLY on file paths, doesn't rely on any `resource` mappings.
*/

const {utils: Cu} = Components;

Cu.importGlobalProperties(["URL"]);
const DIRECTORY = new URL(this.__URI__ + "/../").href;

/** Note: restrutured schema.json into schema.jsm */
const { schema } = Cu.import(DIRECTORY + "Schema.jsm", {});

/** Note: restructured `dist/ajv.min.js` => ajv.min.jsm */
const { Ajv } = Cu.import(DIRECTORY + "Ajv.jsm", {});
const ajv = new Ajv();

// logging to show that imported `.jsm` still works
const log = (function makeLogger() {
  Cu.import("resource://gre/modules/Log.jsm");
  const log = Log.repository.getLogger("something");
  log.addAppender(new Log.ConsoleAppender(new Log.BasicFormatter()));
  log.level = Log.Level.Debug;
})();


function validate (data, schema) {
  var valid = ajv.validate(schema, data);
  return {valid, errors:  ajv.errors || []};
}


class Something {
  constructor(config) {
    const validation = validate(config, schema);
    if (!validation.valid) {
      throw new Error(validation.errors);
    }
  }
  do () {
    // note: firefox logging
    log.debug(`my field is: ${this.someField}`);
    return this.someField;
  }

  unload () {
    ['schema.jsm', 'ajv.min.jsm'].forEach((p)=>Cu.unload(DIRECTORY+p));
  }
}

const something = new Something({someField: aValue});
const EXPORTED_SYMBOLS = ['something'];
