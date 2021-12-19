import path from 'path';
import express from 'express';
import cors from 'cors';
import MoviesRouter from './api/movies';
import ActorsRouter from './api/actors';
import DirectorsRouter from './api/directors';
import GenresRouter from './api/genres';
import TwitterRouter from './api/twitter';
import UsersRouter from './api/users';

const app = express();

const port = process.env.PORT || 3000;
const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.static(dist))
app.use(express.json());

app.use('/api/movies', MoviesRouter);
app.use('/api/actors', ActorsRouter);
app.use('/api/directors', DirectorsRouter);
app.use('/api/genres', GenresRouter);
app.use('/api/twitter', TwitterRouter);
app.use('/api/users', UsersRouter);


app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});

export default app
