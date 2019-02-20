const validator = require("validator"); //https://github.com/chriso/validator.js/
const eGol = require("./e-gol");

module.exports = function validareLogare(data) {
  let err = {};

  data.email = !eGol(data.email) ? data.email : "";
  data.password = !eGol(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    err.email = "email invalid";
  }

  if (validator.isEmpty(data.email)) {
    err.email = "email-ul este necesar";
  }
  if (validator.isEmpty(data.password)) {
    err.password = "parola este necesara";
  }

  return {
    err,
    eValid: eGol(err)
  };
};
