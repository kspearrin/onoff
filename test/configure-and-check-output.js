"use strict";

var Gpio = require('../onoff').Gpio,
  assert = require('assert'),
  output = new Gpio(14, 'out');

assert(output.direction() === 'out');

output.writeSync(1);
assert(output.readSync() === 1);

output.writeSync(0);
assert(output.readSync() === 0);

output.write(1, function (err) {
  if (err) {
    throw err;
  }

  output.read(function (err, value) {
    if (err) {
      throw err;
    }

    assert(value === 1);

    output.writeSync(0);
    assert(output.readSync() === 0);

    output.unexport();

    console.log('ok - ' + __filename);
  });
});

