import type { Response, Request } from 'express';
import { Router } from 'express';
import axios from 'axios';
import { userInfo } from 'os';
// import type {Request, Response} from 'express';
const {addUser, updateUser, getUserById} = require('../database/index');
const UsersRouter = Router();

UsersRouter.get('/:id', (req: Request, res: Response) => {
    getUserById(req.body)
        .then((data: object[]) => { res.send(200).send(data) })
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



export default UsersRouter;