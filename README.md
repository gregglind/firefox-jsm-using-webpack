#

## Do this:

`npm run demo`


## Goal:

- a `.jsm` (Firefox code module) that is 1 file

Problems
- `Components.utils.import` doesn't know about JSON files.


we will show this in stages.

- pure `node` style.  (which won't work.)
- pure `Cu.import` style (which is tedious)
- webpack
