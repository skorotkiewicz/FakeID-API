const express = require("express");
const swig = require("swig");
const path = require("path");
const cors = require("cors");
const api = require("./routes/api");
const website = require("./routes/website");
const app = express();

app.engine("html", swig.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public"), { maxAge: 3600000 })); // 3600000msec == 1hour

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Route Prefixes for Website
app.use("/", website);

//Route Prefixes for API
app.use("/api", api);

// handle errors
app.use(function (err, req, res, next) {
  if (err.status === 500)
    return res.status(500).json({ message: "Something looks wrong" });
});

// throw 404 if URL not found
app.all("*", function (req, res) {
  return res.status(404).json({ message: "Page not found" });
});

app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
