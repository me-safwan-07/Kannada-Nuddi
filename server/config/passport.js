// Import dependencies
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
import mongoose from 'mongoose';

import keys from './keys.js';
import { EMAIL_PROVIDER } from '../constants.js';

// Destructure keys
// const { google, facebook } = keys;
const { google } = keys;
const secret = keys.jwt.secret;

// Import User model
const User = mongoose.model('User');

// Configure JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Set up JWT Strategy
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Export main setup function as async module export
export default async (app) => {
  app.use(passport.initialize());

  await googleAuth();
  // await facebookAuth();
};

// Google Authentication setup
const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: google.clientID,
          clientSecret: google.clientSecret,
          callbackURL: google.callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.email });
            if (user) {
              return done(null, user);
            }

            const [firstName, lastName] = profile.displayName.split(' ');

            user = new User({
              provider: EMAIL_PROVIDER.Google,
              googleId: profile.id,
              email: profile.email,
              firstName,
              lastName,
              avatar: profile.picture,
              password: null,
            });

            await user.save();
            return done(null, user);
          } catch (err) {
            return done(err, false);
          }
        }
      )
    );
  } catch (error) {
    console.log('Missing Google keys');
  }
};

// Facebook Authentication setup
// const facebookAuth = async () => {
//   try {
//     passport.use(
//       new FacebookStrategy(
//         {
//           clientID: facebook.clientID,
//           clientSecret: facebook.clientSecret,
//           callbackURL: facebook.callbackURL,
//           profileFields: [
//             'id',
//             'displayName',
//             'name',
//             'emails',
//             'picture.type(large)',
//           ],
//         },
//         async (accessToken, refreshToken, profile, done) => {
//           try {
//             let user = await User.findOne({ facebookId: profile.id });
//             if (user) {
//               return done(null, user);
//             }

//             user = new User({
//               provider: EMAIL_PROVIDER.Facebook,
//               facebookId: profile.id,
//               email: profile.emails ? profile.emails[0].value : null,
//               firstName: profile.name.givenName,
//               lastName: profile.name.familyName,
//               avatar: profile.photos[0].value,
//               password: null,
//             });

//             await user.save();
//             return done(null, user);
//           } catch (err) {
//             return done(err, false);
//           }
//         }
//       )
//     );
//   } catch (error) {
//     console.log('Missing Facebook keys');
//   }
// };
