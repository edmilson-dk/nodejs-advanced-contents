import { pipeline, Readable } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const readableStream = new Readable({
  read() {
    this.push("Hello 01");
    this.push("Hello 02");
    this.push("Hello 03");
    this.push("Hello 04");
    this.push(null);
  }
});

await pipelineAsync(
  readableStream,
  process.stdout
);