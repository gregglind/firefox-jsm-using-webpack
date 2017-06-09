fs = require("fs");

const schemaJsm = `"use strict";

// created by build-jsm.js

const EXPORTED_SYMBOLS=["schema"];

const schema=${fs.readFileSync("schema.json","utf8")}
`

const ajvJsm = `
// created by build-jsm.js

const EXPORTED_SYMBOLS = ['Ajv'];

${fs.readFileSync("./node_modules/ajv/dist/ajv.min.js","utf8")}
`

fs.writeFileSync("Schema.jsm", schemaJsm);
fs.writeFileSync("Ajv.jsm", ajvJsm);
