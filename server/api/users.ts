import type { Response, Request } from 'express';
import { Router } from 'express';
import axios from 'axios';
import { userInfo } from 'os';
import { addFavoriteMovie } from '../database';
// import type {Request, Response} from 'express';
const { addUser,
        updateUser,
        getUserById,
        getFavoriteMovies,
        getFavoriteActors,
        getFavoriteDirectors,
        getFavoriteGenres,
        removeFavoriteMovie } = require('../database/index');
const UsersRouter = Router();

UsersRouter.get('/:id', (req: Request, res: Response) => {
    getUserById(req.body)
        .then((data: object[]) => { res.send(200).json(data) })
        .catch((err: object[]) => { res.sendStatus(500) })
});


UsersRouter.post('/', (req: any, res: any) => {
    addUser(req.body)
        .then(() => {
            console.log('Router: Added new user.');
            res.sendStatus(200);
        })
        .catch((err: any) => {
            console.log('Router: Failed to add new user.', err)
        })
})

UsersRouter.patch('/:id', (req: Request, res: Response) => {
    updateUser(req.body)
        .then(() => {
            console.log('Router: Updated User successfully');
            res.sendStatus(200);
        })
        .catch((err: any) => {
            console.log('Router: failed to update user.', err)
        })
})

//User
UsersRouter.post('/', (req: Request, res: Response) => {
    addFavoriteMovie(req.params.user, req.params.movie)
        .then(() => {
            console.log('User Router: Added favorite movie to user');
            res.sendStatus(200);
        })
        .catch((err: any) => {
            console.log('User Router: unable to add movie to user favorites', err);
        })
})

// GET USER FAVORITES //
UsersRouter.get('/movies/:id', (req: Request, res: Response) => {
    getFavoriteMovies(Number(req.params.id))
    .then((data: object[]) => {
      res.status(200).send(data)
    })
    .catch((err: object) => { res.sendStatus(500) });
  });

UsersRouter.get('/actors/:id', (req: Request, res: Response) => {
    getFavoriteActors(Number(req.params.id))
        .then((data: object[]) => res.status(200).send(data))
        .catch((err: object) => {
        console.error(err);
        res.sendStatus(500);
        });
});

UsersRouter.get('/directors/:id', (req: Request, res: Response) => {
    getFavoriteDirectors(Number(req.params.id))
      .then((data: object[]) => res.status(200).send(data))
      .catch((err: object) => {
        console.error(err);
        res.sendStatus(500);
      });
  });

UsersRouter.get('/genres/:id', (req: Request, res: Response) => {
    getFavoriteGenres(Number(req.params.id))
        .then((data: object[]) => res.status(200).send(data))
        .catch((err: object) => {
        console.error(err);
        res.sendStatus(500);
        });
});
// END GET USER FAVORITES //

// USER DESTROY FAVORITES //

UsersRouter.delete('/movies/:id', (req: Request, res: Response) => {
    removeFavoriteMovie(Number(req.params.id))
    .then(() => {
        console.log('HIITTTTT')
        res.sendStatus(200) })
    .catch((err: any) => { res.sendStatus(500) })
})



export default UsersRouter;