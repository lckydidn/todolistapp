const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const router = require("./routes/index.js");
const morgan = require("morgan");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
