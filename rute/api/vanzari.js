const express = require("express");
const router = express.Router();

//@route    GET api/vanzari/test
//@desc     test vanzari route
//@access   public

router.get("/test", (req, res) =>
  res.json({ msg: "ruta vanzari functionala" })
);

module.exports = router;
