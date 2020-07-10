const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require("../config/keys").secretOrKey;

module.exports = (passport) =>
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      if (jwt_payload.id) {
        publicModels.user.one({ id: jwt_payload.id }, function (err, user) {
          if (err) {
            console.log(err);
            return done(err, false);
          }
          if (user) return done(null, user);
          else return done(null, false);
        });
      } else {
        return done(null, false);
      }
    })
  );
