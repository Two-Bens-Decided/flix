import {Router} from 'express';
import type {Request, Response} from 'express';
import { getAllMovies, getAllMoviesByDirector, getAllMoviesByGenre, getAllMoviesWithActor, addMovie, getMovieById } from '../database/index';

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
  const genreId = Number(req.params.id);
  getAllMoviesByGenre(genreId)
  .then((data: any) => {
    const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/actors/:id', (req: Request, res: Response) => {
  getAllMoviesWithActor(Number(req.params.id))
    .then((data: any) => {
      const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/directors/:id', (req: Request, res: Response) => {
  getAllMoviesByDirector(Number(req.params.id))
    .then((data: any) => {
      const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//gonna use one of these
MoviesRouter.post('/saveMovie', (req: Request, res: Response) => {
  console.log(req.body);
  type movieData = {imDbID: string; title: string; releaseDate: string; videoDescription: string; linkEmbed: string; genres: string;
    actors: string; directors: string; thumbnailUrl: string};
  const {imDbID, title, releaseDate, videoDescription, linkEmbed, genres, actors, directors, thumbnailUrl}: movieData = req.body;
  const movie = {
    movie_id: imDbID,
    title: title,
    release_date: releaseDate,
    description : videoDescription,
    trailer_url: linkEmbed,
    genres: genres,
    actors: actors,
    directors: directors,
    thumbnailUrl: thumbnailUrl
  };
  return addMovie(movie);
});

//one of these for my save movies
MoviesRouter.post('/', (req: Request, res: Response) => {
  addMovie(req.body)
    .then(() => {;
      res.sendStatus(201);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/:id', (req: Request, res: Response) => {
  getMovieById(parseInt(req.params.id))
    .then((data: MovieObj) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    })
});

export default MoviesRouter;
