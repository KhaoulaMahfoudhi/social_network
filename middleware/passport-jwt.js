const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const passport = require('passport');
const User = require('../models/User');
const secretOrKey = config.get('secretOrKey');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

passport.initialize();
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const { id } = jwt_payload;
    try {
      const user = await User.findById(id).select('-password');
      user ? done(null, user) : done(null, false);
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  })
);
module.exports = isAuth = () =>
  passport.authenticate('jwt', { session: false });
