import {Router} from 'express';
import type {Request, Response} from 'express';
const GenresRouter = Router();
const {getFavoriteGenres, addGenre} = require('../database/index');

GenresRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteGenres(req.params.id)
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

GenresRouter.post('/', (req: Request, res: Response) => {
  addDirector(req.body.director);
});

export default GenresRouter;