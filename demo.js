const p = require("process").cwd()

const script = `

/** Demonstration of Webpacked jsm usage.
  *
  * 1. tools > browser toolbox # (or any other debugger (chrome) context)
  * 2. Run the code :)
  *
  **/

path = "${p}";

// Cu.import style
p = "file://" + path + "/Cu.import/Something.jsm";
Cu.unload(p);
Services.obs.notifyObservers(null, "startupcache-invalidate", null);
var {something} = Cu.import(p);
console.log(something.style)
something.do();
something.unload();


// Webpacked
p = "file://" + path + "/webpacked-jsm/Something.jsm";
Cu.unload(p);
Services.obs.notifyObservers(null, "startupcache-invalidate", null);
var {something} = Cu.import(p);
console.log(something.style)
something.do();

`
console.log(script);
