const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT ?? 8080;

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY ?? "secret123";

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", checkJwt, profile);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

function checkJwt(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send("token not valid");
    } else {
      console.log(token);
      req.payload = decoded;
    }
  });

  next();
}
