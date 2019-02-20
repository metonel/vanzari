const validator = require("validator"); //https://github.com/chriso/validator.js/
const eGol = require("./e-gol");

module.exports = function validareInregistrare(data) {
  let err = {};

  data.nume = !eGol(data.nume) ? data.nume : ""; //validator proceseaza doar string-uri, daca numele nu exista trebuie sa fie string gol, nu undefined

  data.email = !eGol(data.email) ? data.email : "";
  data.type = !eGol(data.type) ? data.type : "";
  data.password = !eGol(data.password) ? data.password : "";
  data.password2 = !eGol(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.nume, { min: 2, max: 30 })) {
    err.nume = "numele trebuie sa fie intre 2 si 30 de caractere";
  }

  if (validator.isEmpty(data.nume)) {
    err.nume = "numele e necesar";
  }

  if (validator.isEmpty(data.email)) {
    err.email = "email-ul e necesar";
  }

  if (!validator.isEmail(data.email)) {
    err.email = "email invalid";
  }

  if (validator.isEmpty(data.type)) {
    err.type = "tipul userului e necesar";
  }

  if (validator.isEmpty(data.password)) {
    err.password = "parola e necesara";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    err.password = "parola trebuie sa fie intre 6 si 30 de caractere";
  }

  if (validator.isEmpty(data.password2)) {
    err.password2 = "este necesara confirmarea parolei";
  }

  if (!validator.equals(data.password, data.password2)) {
    err.password2 = "parolele nu coincid";
  }

  return {
    err,
    eValid: eGol(err)
  };
};
