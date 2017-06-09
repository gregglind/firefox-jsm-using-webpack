# Demonstration of how to use Webpack to make `.jsm` Firefox Modules

## tl;dr - Run the demonstration

`npm run demo`

This will run

- `pure-node` style. Works great in node, but not in Firefox!

This will print, code for using the modules from a Firefox debugger prompt:

- pure `Cu.import` style (which is tedious)
- webpacked into a jsm

## Goal:

- a `.jsm` (Firefox code module) that is 1 file
- that knows about other files and data in a not-tedious way

## Problems
- `Components.utils.import` doesn't know about JSON files.
- Making 'fake' `.jsm` files is fragile and silly seeming.  (See `build-jsm.js` for examples)

## Solution using `webpack`

`this` is your ally.

- `webpack --output-library-target=this` will `Cu.import` correctly
- `this.EXPORTED_SYMBOLS = ['a', 'b', ....]`
- `this.a = <something>`


### Potential improvements

-




