const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  const src = fs.createReadStream("./big.txt");
  src.pipe(res);
});

server.listen(3000, () => console.log("Server is running at port 3000"));