const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import MoviesRouter from './api/movies';
import ActorsRouter from './api/actors';
import DirectorsRouter from './api/directors';
import GenresRouter from './api/genres';
import TwitterRouter from './api/twitter';
import UsersRouter from './api/users';
import type { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;
const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.static(dist))
app.use(express.json());

app.use(cors({ credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false}));

app.use(express.static(dist));
app.use(bodyParser.json());
app.use('/api/movies', MoviesRouter);
app.use('/api/actors', ActorsRouter);
app.use('/api/directors', DirectorsRouter);
app.use('/api/genres', GenresRouter);
app.use('/api/twitter', TwitterRouter);
app.use('/api/users', UsersRouter);

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

export default app
