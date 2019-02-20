const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const User = require("../../models/User"); //user model

const validareInregistrare = require("../../validari/inreg");
const validareLogare = require("../../validari/logare");

//@route    GET api/useri/test
//@desc     test useri route
//@access   public

router.get("/test", (req, res) => res.json({ msg: "ruta useri functionala" }));

//@route    POST api/useri/inregistrare
//@desc     register user
//@access   private

router.post("/reg", (req, res) => {
  const { err, eValid } = validareInregistrare(req.body); // validareInregistrare returneaza un obiect err si un bool eValid, care le destrunturam in astea 2 constante aici

  if (!eValid) {
    return res.status(400).json(err);
  }

  //verificare existenta email user. avem acces la req.body pt ca am adaugat body parser in server
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "emailul exista deja" });
    } else {
      const newUser = new User({
        nume: req.body.nume,
        type: req.body.type,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //HMMMM
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/useri/login
//@desc     logare user/ return token
//@access   public

router.post("/login", (req, res) => {
  const { err, eValid } = validareLogare(req.body);

  if (!eValid) {
    return res.status(400).json(err);
  }

  const email = req.body.email;
  const pwd = req.body.password;
  //identif user
  User.findOne({ email: email }).then(user => {
    if (!user) {
      err.email = "email inexistent!";
      return res.status(404).json(err);
    }
    //verif pwd
    bcrypt.compare(pwd, user.password).then(gasit => {
      if (gasit) {
        // user gasit
        const payload = { id: user.id, nume: user.nume, type: user.type }; //payload pt jwt
        //semnare token
        jwt.sign(
          payload,
          keys.secretJWT,
          { expiresIn: 12 * 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        err.password = "parola incorecta";
        return res.status(400).json(err);
      }
    });
  });
});

//@route    GET api/useri/current
//@desc     return current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
