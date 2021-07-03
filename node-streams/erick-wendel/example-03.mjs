import { pipeline, Readable, Transform } from "stream";
import { createWriteStream } from "fs";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const readableStream = new Readable({
  read() {
    for (let index = 0; index <= 2e5; index++) {
      const person = {
        id: Date.now() + index,
        name: "DK-" + index,
        email: `teste${index}@gmail.com`,
      };

      const data = JSON.stringify(person);
      this.push(data);
    }

    this.push(null);
  }
});

const transformToCSV = new Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name},${data.email}\n`;
    cb(null, result);
  }
});

const setHeader = new Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    cb(null, "ID | NAME | EMAIL\n".concat(chunk));
  }
});

await pipelineAsync(
  readableStream,
  transformToCSV,
  setHeader,
  createWriteStream("write.txt"),
);