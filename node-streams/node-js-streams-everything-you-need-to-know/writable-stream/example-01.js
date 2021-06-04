const { Writable } = require("stream");

const outStream = new Writable({
  write(chunk, encondig, callback) {
    console.log("Digits: " + chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);