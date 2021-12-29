
//NOTE: NONE OF THIS IS GETTING USED. PASSPORT FUNCTION IS OVER IN SERVER/INDEX.TS
//Hold onto this as it may be useful for the twitter strategy.

require("dotenv").config();
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import Strategy from 'passport-google-oauth2';
import { addUser } from './database';
const { google_clientID, google_clientSecret, passportCallbackURL } = process.env;
import User from './database/index';

passport.use(new GoogleStrategy({
  clientID: `${google_clientID}`,
  clientSecret:`${google_clientSecret}`,
  callbackURL: `${passportCallbackURL}`
},
function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
  // const profileJson = JSON.parse(profile._json);
  // const userData = {
  //   username: profileJson.email,
  //   email_Oauth: profile.getEmail(),
  //   first_name: profileJson.given_name,
  //   last_name: profileJson.family_name,
  //   profile_image_url: profileJson.picture,
  // }
  // console.log('userData', profileJson)
  // addUser(profile);
  // return done(null, profile);
  // new User({})
}))

