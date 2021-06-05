const fs = require("fs");
const zlib = require("zlib");
const { Transform } = require("stream");
const crypto = require("crypto");

const file = process.argv[2];

// -e = encrypt
// -d = decrypt

const command = process.argv[3];

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    
    process.stdout.write(`.`);
    callback(null, chunk);
  }
});

const algo = "aes-256-ctr";
const key = crypto.randomBytes(16).toString("hex");
const salt = crypto.randomBytes(8).toString("hex");

if (command === "-e") {
  fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipheriv(algo, key, salt))
    .pipe(reportProgress)
    .pipe(fs.createWriteStream(file + ".gz"))
    .on("finish", () => console.log("\nDone :)"))
}

if (command === "-d") {
  fs.createReadStream(file)
    .pipe(crypto.createDecipheriv(algo, key, salt))
    .pipe(zlib.createGunzip())
    .pipe(reportProgress)
    .pipe(fs.createWriteStream(file.slice(0, -3)))
    .on("finish", () => console.log("\nDone :)"))
}