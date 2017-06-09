
set -x PATH ./node_modules/.bin $PATH

node build-jsm.js
mv Schema.jsm Ajv.jsm Cu.import/

cd jsm-webpack && webpack --output-library-target=this Something.in.js Something.jsm
