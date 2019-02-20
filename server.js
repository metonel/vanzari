const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //pt a folosi body.{etc} din requesturi
const passport = require("passport");

const diverse = require("./rute/api/diverse");
const useri = require("./rute/api/useri");
const vanzari = require("./rute/api/vanzari");

const app = express();

//body parset middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config DB
const db = require("./config/keys").mongoURI;

//conectare la MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("conectat la bd"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("salut");
});

//passport middleware
app.use(passport.initialize());
//passport strategy
require("./config/passport")(passport);

//rute

app.use("/api/diverse", diverse);
app.use("/api/useri", useri);
app.use("/api/vanzari", vanzari);

const port = process.env.PORT || 5000; //process.env.PORT e pt heroku

app.listen(port, () => console.log(`server pe portul ${port}`));
