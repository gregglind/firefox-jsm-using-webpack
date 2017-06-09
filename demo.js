const p = require("process").cwd()

console.log(`/** First, pure-node

> var {something} = require("./pure-node/Something.js");
> console.log(something.style)
> something.do();
`)
var {something} = require("./pure-node/Something.js");
console.log(something.style)
something.do();

console.log('*/');


const script = `

/** Demonstration of Webpacked jsm usage.
  *
  * 1. tools > browser toolbox # (or any other debugger (chrome) context)
  * 2. Run the code :)
  *
  **/

var path = "${p}";

// Cu.import style
var p = "file://" + path + "/Cu.import/Something.jsm";
Cu.unload(p);
Services.obs.notifyObservers(null, "startupcache-invalidate", null);
var {something} = Cu.import(p, {});
console.log("STYLE:",something.style)
something.do();
something.unload();


// Webpacked
var p = "file://" + path + "/jsm-webpack/Something.jsm";
Cu.unload(p);
Services.obs.notifyObservers(null, "startupcache-invalidate", null);
var {something} = Cu.import(p, {});
console.log("STYLE:",something.style)
something.do();

`
console.log(script);
