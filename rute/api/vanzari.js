const express = require("express");
const router = express.Router();
const passport = require("passport");

const Vanzare = require("../../models/Vanzare");
const User = require("../../models/User");
const Diverse = require("../../models/Diverse");

//@route    GET api/vanzari/test
//@desc     test vanzari route
//@access   public

router.get("/test", (req, res) =>
  res.json({ msg: "ruta vanzari functionala" })
);

//@route    GET api/vanzari/
//@desc     returneaza colectia de vanzari
//@access   private

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vanzare.find({ data: { $gte: new Date(2019) } }).then(vanz =>
      res.json(vanz)
    );
  }
);

//@route    POST api/vanzari/add
//@desc     vanzare noua sau editare vanzare
//@access   private

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const vanzareNoua = new Vanzare({
      user: req.user.id,
      produs: req.body.produs,
      pret: req.body.pret
    });
    vanzareNoua
      .save()
      .then(vanz => res.json(vanz))
      .catch(err => console.log(err));
  }
);

//@route    POST api/vanzari/:id
//@desc     editare vanzare
//@access   private

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const vanzare = {};
    if (req.body.produs) vanzare.produs = req.body.produs;
    if (req.body.pret) vanzare.pret = req.body.pret;
    Vanzare.findById(req.params.id).then(vanz => {
      if (req.user.type === 0 || vanz.user.toString() === req.user.id) {
        //vanzatorul initial sau admin
        //salveaza in diverse vanzarea veche
        User.findById(vanz.user).then(usr => {
          const vandutDe = usr.nume;
          const div = new Diverse({
            user: req.user.id,
            continut:
              "EDITAT produs: " +
              vanz.produs +
              " " +
              vanz.pret +
              " la data de " +
              vanz.data +
              " vanzator " +
              vandutDe +
              " in " +
              (vanzare.produs || "") +
              " " +
              (vanzare.pret || ""),
            modifVanzare: 1
          });
          div.save();
        });
        console.log(vanz.produs);
        Vanzare.findByIdAndUpdate(
          //{_id: req.params.id},
          req.params.id,
          { $set: vanzare },
          { new: true }
        )
          .then(vanzare => res.json(vanzare))
          .catch(err => console.log(err));
      } else {
        res.json({
          err:
            "Doar vanzatorul initial poate sterge intrarea, foloseste sectiunea detalii, specificand produsul vandut si data vanzarii"
        });
      }
    });
  }
);

//@route    DELETE api/vanzari/:id
//@desc     sterge o vanzare, o salveaza in diverse
//@access   private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vanzare.findById(req.params.id).then(vanz => {
      if (req.user.type === 0 || vanz.user.toString() === req.user.id) {
        //let stersDe = "";

        User.findById(vanz.user).then(usr => {
          const vandutDe = usr.nume;
          //User.findById(req.user.id).then(usr => (stersDe = usr.nume));
          const div = new Diverse({
            user: req.user.id,
            continut:
              "STERS produs: " +
              vanz.produs +
              " " +
              vanz.pret +
              " la data de " +
              vanz.data +
              " vanzator " +
              vandutDe,
            modifVanzare: 1
          });
          div.save();
        });

        vanz
          .remove()
          .then(() => res.json({ succes: "intrarea a fost stearsa!" }));
      } else {
        res.json({
          err:
            "Doar vanzatorul initial poate sterge intrarea, foloseste sectiunea detalii, specificand produsul vandut si data vanzarii"
        });
      }
    });
  }
);

module.exports = router;
