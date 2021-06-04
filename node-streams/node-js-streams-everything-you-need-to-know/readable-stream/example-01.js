const { Readable } = require("stream");

const inStream = new Readable({
  read() {}
});

inStream.push("AAKAKSKKS");
inStream.push("BBBBBBBBBB");

inStream.push(null);

inStream.pipe(process.stdout);