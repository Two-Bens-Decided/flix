import express from 'express';
import type { Response, Request } from 'express';
import { Router } from 'express';
const router = Router();
const auth = require('../helpers/auth');

//get root page
router.get('/', (req: Request, res: Response) => {
  res.render('index', { user: req.user });
});

//GET login page
router.get('/login', (req: Request, res: Response) => {
  res.render('login', { user: req.user });
});

//GET route for when you click on login - passport authentication through google
router.get('/auth/google', auth.passport.authenticate('google', { scope: ['profile']} ));

//If successful auth -> redirect to home page
//If unsuccessful auth -> redirect to /login
router.get('/auth/auth/google/callback',
    auth.passport.authenticate('google', { failureRedirect: '/login' }),
     (req: Request, res: Response) => {
       //successful authentication
       res.redirect('/');
});

//GET Logout route
router.get('/logout', (req: Request, res: Response) => {
  req.logOut();
  res.redirect('/');
});

function ensureAuthenticated(req: Request, res: Response, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;