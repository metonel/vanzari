// vezi https://github.com/themikenicholson/passport-jwt
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("useri"); //model-ul exportat din User la exports 'useri'
const keys = require("../config/keys");

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.secretJWT;

module.exports = passport => {
  //in server.js in middleware-ul pt Passport am trimis ca si parametru passport
  passport.use(
    new JwtStrategy(opt, (jwt_payload, done) => {
      //done ii functia care merge mai departe in ruta protejata, da cu am returna done, ar ramane blocata in autentificare, asa trimite in req -ul functiei callback din ruta parametru din done, aici user
      //console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
