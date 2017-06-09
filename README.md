# Demonstration of how to use Webpack to make `.jsm` Firefox Modules

Use `webpack` to make single-file jsm's that are `Cu.import`-able

## tl;dr - Run the demonstration

`npm run demo`

This will run

- `pure-node` style. Works great in node, but not in Firefox!

This will print code for using the modules from a Firefox debugger prompt:

- pure `Cu.import` style (which is tedious)
- webpacked into a `.jsm`

**jsm-webpack/Something.in.js** is the final file.

## Goal:

- a `.jsm` (Firefox code module) that is 1 file
- that knows about other files and data in a not-tedious way

## Problems
- `Components.utils.import` doesn't know about JSON files.
- Making 'fake' `.jsm` files is fragile and silly seeming.  (See `build-jsm.js` for examples)
- using `Cu.import` from libraries requires tracking unloading for all of those as well.

## Solution using `webpack`

`this` is your ally.

- `webpack --output-library-target=this` will `Cu.import` correctly
- `this.EXPORTED_SYMBOLS = ['a', 'b', ....]`
- `this.a = <something>`


### Potential improvements

- webpack makes 1 big file.  If you have pieces that don't always need loading, consider breaking them up.




