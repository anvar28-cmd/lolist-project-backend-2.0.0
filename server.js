const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT ?? 8080;
const secret = process.env.SECRET_KEY ?? "secret123";

const auth = require("./routes/auth");
const heroes = require("./routes/heroes");
const items = require("./routes/items")
const spells = require("./routes/spells")
const builds = require("./routes/builds")

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/heroes", checkAuth, heroes);
app.use("/items", checkAuth, items);
app.use("/spells", checkAuth, spells);
app.use("/builds", checkAuth, builds);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

function checkAuth(req, res, next) {
  const token = req.headers["x-token"];
  
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error(err);
      res.status(401).send("Unauthorized");
    } else {
      req.payload = decoded;
      next();
    }
  });

}
