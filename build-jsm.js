fs = require("fs");

const schemaJsm = `
// created by build-jsm.js

var EXPORTED_SYMBOLS=["schema"];

var schema = ${fs.readFileSync("schema.json","utf8")}
`

const ajvJsm = `
// created by build-jsm.js

var EXPORTED_SYMBOLS = ['Ajv'];

${fs.readFileSync("./node_modules/ajv/dist/ajv.min.js","utf8")}
`

fs.writeFileSync("Schema.jsm", schemaJsm);
fs.writeFileSync("Ajv.jsm", ajvJsm);
