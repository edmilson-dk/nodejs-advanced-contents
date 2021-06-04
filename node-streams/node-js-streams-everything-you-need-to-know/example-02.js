const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("./big.txt", (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});

server.listen(3000, () => console.log("Server is running at port 3000"));