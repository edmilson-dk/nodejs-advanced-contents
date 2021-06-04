const { Transform } = require("stream");

const upperCaseTrStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTrStream).pipe(process.stdout);