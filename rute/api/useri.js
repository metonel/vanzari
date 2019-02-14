const express = require("express");
const router = express.Router();

//@route    GET api/useri/test
//@desc     test useri route
//@access   public

router.get("/test", (req, res) => res.json({ msg: "ruta useri functionala" }));

module.exports = router;
