import {Router} from 'express';
import type {Request, Response} from 'express';
const {getAllMovies, getAllMoviesByDirector, getAllMoviesByGenre, getAllMoviesWithActor} = require('../database/index')

const MoviesRouter = Router();
interface MovieObj {
  [key: string]: string | number;
}

MoviesRouter.get('/', (req: Request, res: Response) => {
  getAllMovies()
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/genres/:id', (req: Request, res: Response) => {
  getAllMoviesByGenre(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/actors/:id', (req: Request, res: Response) => {
  getAllMoviesWithActor(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/directors/:id', (req: Request, res: Response) => {
  getAllMoviesByDirector(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default MoviesRouter;