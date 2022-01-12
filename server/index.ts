require('dotenv').config();
const { google_clientID, google_clientSecret, passportCallbackURL } = process.env;
import User from './database/index';


import path from 'path';
import express from 'express';
import cors from 'cors';
import MoviesRouter from './api/movies';
import ActorsRouter from './api/actors';
import DirectorsRouter from './api/directors';
import GenresRouter from './api/genres';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import formData from 'express-form-data';
const app = express();
import type { Response, Request } from 'express';
import TwitterRouter from './api/twitter';
import UsersRouter from './api/users';
import PhotosRouter from './api/photos';
import { addUser, getUserById } from './database';
import { profile } from 'console';
import { any } from 'sequelize/dist/lib/operators';
// const auth = require('./helpers/auth');
// const authroutes = require('./api/authroutes');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import fileUpload from 'express-fileupload';

const port = process.env.PORT || 3000;
const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000}));
app.use(express.json({limit: '50mb'}));
app.use(fileUpload({useTempFiles: true}));

app.use(cors({ credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false}));

app.use(express.static(dist));
//Routers
app.use('/api/movies', MoviesRouter);
app.use('/api/actors', ActorsRouter);
app.use('/api/directors', DirectorsRouter);
app.use('/api/genres', GenresRouter);
app.use('/api/twitter', TwitterRouter);
app.use('/api/users', UsersRouter);
app.use('/api/photos', PhotosRouter);


//Start of Passport
app.use(cookieParser());
app.use(formData.parse());

app.use(session({
  secret: `${process.env.google_clientID}`,
  saveUninitialized: false,
  resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

// this is not getting used, but may be useful later when integrating the twitter strategy

// app.use(auth.passport.initialize());
// app.use(auth.passport.session());
// app.use('/', authroutes);

passport.use(new GoogleStrategy({
  clientID: `${google_clientID}`,
  clientSecret:`${google_clientSecret}`,
  callbackURL: `${passportCallbackURL}`
},
async function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
  //Find or Create a user
  //returns [{}, boolean]
  // [0] = user object
  // [1] = true if created, false if found
    const newUser = await addUser(profile);
    console.log('newUser', newUser)
    return done(null, newUser[0]);
}));

passport.serializeUser((user: any, done: any) => {
  return done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  return done(null, user)
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'profile' ] }));

//applies cookies to the user object.
//Still need to figure out the session data and how that applies.
app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
(req: Request, res: Response) => {
  res.cookie('Flix', req.user)
  res.redirect('/');
});
//End of Passport

//get currently logged in user
//NOTE: this is currently not being used, app.get('/verify') is sending user data up front
app.get('/api/users', (req: Request, res: Response) => {
  return getUserById(req.body)
    .then((data: any) => { res.json({data})})
    .catch((err: any) => { console.log('Unable to retrieve user', err) })
});

app.post('/api/users', (req: Request, res: Response) => {

//this may not be necessary anymore, as the passport function is covering this.

});

app.get('/verify', (req, res) => {
  if (req.cookies.Flix) {
    //sends up user to app.tsx, to then be passed down to the children
    res.status(200).send(req.user)
  } else {
    res.json(false);
  }
});

//reset sessionId back to null
app.get('/logout', (req: Request, res: Response) => {
  console.log('logged out hit');
  res.clearCookie('Flix');
  res.redirect('/');
});

// fixes the "CANNOT GET component" on page refresh
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(dist, 'index.html'), (err: any) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});



app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});

export default app;
