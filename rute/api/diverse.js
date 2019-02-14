const express = require("express");
const router = express.Router();

//@route    GET api/diverse/test
//@desc     test diverse route
//@access   public
router.get("/test", (req, res) =>
  res.json({ msg: "ruta diverse functionala" })
);

module.exports = router;
