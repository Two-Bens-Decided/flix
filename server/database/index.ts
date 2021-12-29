import { Movie } from "@material-ui/icons";
import { profile } from "console";
import { response } from "express";


const Sequelize = require('sequelize');
require('dotenv').config();

interface movieObj {
  [key:string]: string;
}

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,

} = process.env;

const db = new Sequelize({
  database: DATABASE,
  username: USER_NAME,
  password: USER_PASSWORD,
  host: HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

db.authenticate()
  .then(() => console.log('connected to database'))
  .catch((err: object) => console.log(err, 'error hitting'));


const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: Sequelize.STRING,
  email_Oauth: Sequelize.STRING,
  twitter_Oauth: Sequelize.STRING,
  twitter_user_name: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  profile_image_url: Sequelize.STRING,
  sessionID: Sequelize.STRING,
  age: Sequelize.INTEGER
});
// insert into users (id, username, email_Oauth, twitter_Oauth, twitter_user_name, first_name, last_name, profile_image_url, age) values (1, 'sbelete01', 'sbelete01@gmail.com', 1234, 'sbelete_twitter', 'sam', 'belete', 'image_url', 21);

const Genre = db.define('genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    unique: true
  }
});

const Movies = db.define('movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  movie_id: {
    type: Sequelize.STRING,
    unique: true
  },
  title: Sequelize.STRING,
  trailer_url: Sequelize.STRING(2048),
  description: Sequelize.STRING(8192),
  release_date: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING(2048)
});

const Actors = db.define('actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  actor_name: {
    type: Sequelize.STRING,
    unique: true
  }
});

const Directors = db.define('directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  director_name: {
    type: Sequelize.STRING,
    unique: true
  }
});

const Tweets = db.define('tweets', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tweet_text: {
    type: Sequelize.STRING,
    unique: true
  }
})

// join tables
const Users_Genre = db.define('users_genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Users_Movies = db.define('users_movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Movie_Genre = db.define('movie_genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Movie_Actors = db.define('movie_actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Movie_Directors = db.define('movie_directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Users_Directors = db.define('users_directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Users_Actors = db.define('users_actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Users_Tweets = db.define('users_Tweets', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});


// creates userId & genreId columns in users_genre table
User.belongsToMany(Genre, { through: 'users_genre' });
Genre.belongsToMany(User, { through: 'users_genre' });

// creates userId & movieId columns in users_movies table
User.belongsToMany(Movies, { through: 'users_movies' });
Movies.belongsToMany(User, { through: 'users_movies' });

// creates movieId & genreId columns in movie_genre table
Movies.belongsToMany(Genre, { through: 'movie_genre' });
Genre.belongsToMany(Movies, { through: 'movie_genre' });
// small bug creates table as movie_genres

// creates movieId & actorsId columns in movie_actors table
Movies.belongsToMany(Actors, { through: 'movie_actors' });
Actors.belongsToMany(Movies, { through: 'movie_actors' });

// creates movieId & directorsID columns in movie_actors table
Movies.belongsToMany(Directors, { through: 'movie_directors' });
Directors.belongsToMany(Movies, { through: 'movie_directors' });

// creates userId & directorsID columns in movie_actors table
User.belongsToMany(Directors, { through: 'users_directors' });
Directors.belongsToMany(User, { through: 'users_directors' });

// creates userId & directorsID columns in movie_actors table
User.belongsToMany(Actors, { through: 'users_actors' });
Actors.belongsToMany(User, { through: 'users_actors' });

// creates userId & tweetsID columns in users_tweets table
User.belongsToMany(Tweets, { through: 'users_tweets' });
Tweets.belongsToMany(User, { through: 'users_tweets' });


User.sync();
Genre.sync();
Movies.sync();
Actors.sync();
Directors.sync();
Tweets.sync();
Users_Genre.sync();
Users_Movies.sync();
Movie_Genre.sync();
Movie_Actors.sync();
Movie_Directors.sync();
Users_Actors.sync();
Users_Directors.sync();
Users_Tweets.sync();

export const getAllMovies = () => {
  return Movies.findAll();
};

export const getAllGenres = () => {
  return Genre.findAll();
};

export const getAllActors = () => {
  return Actors.findAll();
};

export const getAllDirectors = () => {
  return Directors.findAll();
};

export const getAllMoviesByGenre = (genre: number) => {
  return Genre.findOne({
    where: {id: genre},
    include: [
      {
        model: Movies,
        through: {where: {genreId: genre}}
      }
    ]
  });
};

export const getAllMoviesByDirector = (director: number) => {
  return Directors.findOne({
    where: {id: director},
    include: [
      {
        model: Movies,
        through: {where: {directorId: director}}
      }
    ]
  });
};

export const getAllMoviesWithActor = (actor: number) => {
  return Actors.findOne({
    where: {id: actor},
    include: [
      {
        model: Movies,
        through: {where: {actorId: actor}}
      }
    ]
  });
};

export const getFavoriteActors = (userId: number) => {
  return User.findOne({
    where: {id: userId},
    include: [
      {
        model: Actors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

export const getFavoriteDirectors = (userId: number) => {
  return User.findOne({
    where: {id: userId},
    include: [
      {
        model: Directors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

export const getFavoriteGenres = (userId: number) => {
  return User.findOne({
    where: {id: userId},
    include: [
      {
        model: Genre,
        through: {where: {userId: userId}}
      }
    ]
  });
};

// Movies needs a get favorites
export const getFavoriteMovies = (userId: number) => {
  return User.findAll({
    where: {userId: userId},
    include: [
      {
        model: Movies,
        through: {where: {userId: userId}}
      }
    ]
  });
};

interface userObj {
  [key:string]: string;
}

export const getUserById = async (userId: number) => {
  return User.findByPk(userId);
};


export const addUser = async (user: any) => {
  try {
    const newUser = await User.findOrCreate(
    {where: { email_Oauth: user.id },
      defaults: {
      username: user.displayName,
      email_Oauth: user.id,
      twitter_Oauth: user.twitterId,
      twitter_user_name: user.twitterUsername,
      first_name: user.name.givenName,
      last_name: user.name.familyName,
      profile_image_url: user.photos[0].value,
      sessionID: user.number,
      age: user.age
      }
    });
    return newUser;
  }
  catch (err) {
    console.log('Unable to find or create user.');
  }
};


export const updateUser = async (updateElement: any, userId?: number) => {
  //update element is the object passed back that must have the key prop we want to update
  //ex: updateElement = { number: newNumber }, to update property 'number' on the user object where id = userId
  try {
    const updatedUser = await User.update(updateElement, { where: { id: userId }})
    return updatedUser;
  }
  catch(err) { console.log('Index: failed to update user.')}
};


export const addMovie = async (movie: movieObj, userId?: number) => {
  try {
    const {movie_id, title, description, release_date, trailer_url, thumbnailUrl} = movie;
    const actors = movie.actors.split(', ');
    const directors = movie.directors.split(', ');
    const genres = movie.genres.split(', ');

    const currentMovie = await Movies.findOrCreate({
      where: {
        movie_id: movie_id,
        title: title,
        description: description,
        release_date: release_date,
        trailer_url: trailer_url,
        thumbnailUrl: thumbnailUrl
      }
    });
    const movieId = currentMovie[0].dataValues.id;

    !!userId && Users_Movies.create({
      userId: userId,
      movieId: movieId
    });

    actors.forEach(actor => {
      addActor(actor, movieId, userId);
    });

    directors.forEach(director => {
      addDirector(director, movieId, userId);
    });

    genres.forEach(genre => {
      addGenre(genre, movieId, userId);
    });
  }
  catch (err) {
    console.error('movie not added');
  }
};

export const addActor = async (actor: string, movieId?: number, userId?: number) => {
  try {

    const currentActor = await Actors.findOrCreate(
      {where: {actor_name: actor}}
    );

    const actorId = currentActor[0].dataValues.id;
    !!movieId && Movie_Actors.create({
      actorId: actorId,
      movieId: movieId
    });

    !!userId && Users_Actors.create({
      userId: userId,
      actorId: actorId
    });

  }
  catch (err) {
    console.error('actor not added');
  }
};

export const addDirector = async (director: string, movieId?: number, userId?: number) => {
  try {
    const currentDirector = await Directors.findOrCreate(
      {where: {director_name: director}}
    );

    const directorId = currentDirector[0].dataValues.id;
    !!movieId && Movie_Directors.create({
      directorId: directorId,
      movieId: movieId
    });

    !!userId && Users_Directors.create({
      userId: userId,
      directorId: directorId
    });
  }
  catch (err) {
    console.error('director not added');
  }
};

export const addGenre = async (genre: string, movieId?: number, userId?: number) => {
  try {
    const currentGenre = await Genre.findOrCreate(
      {where: {genre: genre}}
    );
    const genreId = currentGenre[0].dataValues.id;
    !!movieId && Movie_Genre.create({
      genreId: genreId,
      movieId: movieId
    });

    !!userId && Users_Genre.create({
      userId: userId,
      directorId: genreId
    });
  }
  catch (err) {
    console.error('genre not added');
  }
};

export const getMovieById = (id: number) => {
  return Movies.findByPk(id);
};

export default User;

