/*

 docker.r2g notes:

 this file will be copied to this location:

 $HOME/.r2g/temp/project/smoke-test.js

 and it will then be executed with:

 node smoke-test.js


 so, write a smoke test in this file, which only calls require() against your library.
 for example if your library is named "foo.bar", then the *only* require call you
 should make is to require('foo.bar'). If you make require calls to any other library
 in node_modules, then you will got non-deterministic results. require calls to core/built-in libraries are fine.

*/

const {readShebang} = require('read-shebang');

readShebang(__filename, 'utf8', 200, function (err, data) {

  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.log('shebang:', String(data || ''));
  process.exit(0);

});
