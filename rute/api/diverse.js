const express = require("express");
const router = express.Router();
const passport = require("passport");

const Diverse = require("../../models/Diverse");
const User = require("../../models/User");

//@route    GET api/diverse/test
//@desc     test diverse route
//@access   public
router.get("/test", (req, res) =>
  res.json({ msg: "ruta diverse functionala" })
);

//@route    GET api/diverse/
//@desc     returneaza colectia de diverse
//@access   private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Diverse.find({ data: { $gte: new Date(2019, 1, 1) } }).then(div =>
      res.json(div)
    );
  }
);

//@route    POST api/diverse/add/:modif
//@desc     adauga elem la colectia de diverse, daca modif e 1 modifVanzare e true
//@access   private

router.post(
  "/add/:modif",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newDiv = new Diverse({
      user: req.user.id,
      continut: req.body.continut,
      modifVanzare: req.params.modif == 1 ? true : false
    });
    newDiv
      .save()
      .then(div => res.json(div))
      .catch(err => console.log(err));
    //console.log(req.body, req.user);
  }
);

//@route    DELETE api/diverse/:id
//@desc     sterge o intrare diverse, daca userul logat are type 0
//@access   private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Diverse.findById(req.params.id).then(div => {
      if (req.user.type === 0) {
        div.remove().then(() => res.json({ succes: "detalii sterse!" }));
      } else {
        res.json({ err: "privilegii insuficiente" });
      }
    });
  }
);

module.exports = router;
