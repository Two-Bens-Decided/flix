const Sequelize = require('sequelize');

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
  port: DB_PORT,
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
  },
  username: Sequelize.STRING,
  email_Oauth: Sequelize.STRING,
  twitter_Oauth: Sequelize.STRING,
  twitter_user_name: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  profile_image_url: Sequelize.STRING,
  age: Sequelize.INTEGER
});


const Genre = db.define('genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  genre: Sequelize.STRING,
});

const Movies = db.define('movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: Sequelize.STRING,
    unique: true
  },
  title: Sequelize.STRING,
  trailer_url: Sequelize.STRING,
  description: Sequelize.STRING,
  cast: Sequelize.STRING,
  release_date: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING
});

const Actors = db.define('actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  actor_name: {
    data: Sequelize.STRING,
    unique: true
  }
});

const Directors = db.define('directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  director_name: {
    data: Sequelize.STRING,
    unique: true
  }
});

// join tables
const Users_Genre = db.define('users_genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Users_Movies = db.define('users_movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Movie_Genre = db.define('movie_genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Movie_Actors = db.define('movie_actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Movie_Directors = db.define('movie_directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Users_Directors = db.define('users_directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Users_Actors = db.define('users_actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
User.belongsToMany(Directors, { through: 'users_actors' });
Actors.belongsToMany(User, { through: 'users_actors' });

User.sync({force: true});
Genre.sync({force: true});
Movies.sync({force: true});
Actors.sync({force: true});
Directors.sync({force: true});
Users_Genre.sync({force: true});
Users_Movies.sync({force: true});
Movie_Genre.sync({force: true});
Movie_Actors.sync({force: true});
Movie_Directors.sync({force: true});
Users_Actors.sync({force: true});
Users_Directors.sync({force: true});

const getAllMovies = () => {
  return Movies.findAll();
};

const getAllMoviesByGenre = (genre: number) => {
  return Genre.findAll({
    include: [
      {
        model: Movies,
        through: {where: {genreId: genre}}
      }
    ]
  });
};

const getAllMoviesByDirector = (director: number) => {
  return Directors.findAll({
    include: [
      {
        model: Movies,
        through: {where: {directorId: director}}
      }
    ]
  });
};

const getAllMoviesWithActor = (actor: number) => {
  return Actors.findAll({
    include: [
      {
        model: Movies,
        through: {where: {actorId: actor}}
      }
    ]
  });
};

const getFavoriteActors = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Actors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

const getFavoriteDirectors = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Directors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

const getFavoriteGenres = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Genre,
        through: {where: {userId: userId}}
      }
    ]
  });
};
interface movieObj {
  [key:string]: string;
}

const addMovie = async (movie: movieObj, userId?: number) => {
  const {movie_id, title, description, release_date, trailer_url, thumbnailUrl} = movie;
  const actors = movie.actors.split(', ');
  const directors = movie.directors.split(', ');
  const genres = movie.genres.split(', ');

  const currentMovie = await Movies.update({
    movie_id: movie_id,
    title: title,
    description: description,
    release_date: release_date,
    trailer_url: trailer_url,
    thumbnailUrl: thumbnailUrl
  }, {upsert: true});

  !!userId && Users_Movies.create({
    userId: userId,
    movieId: currentMovie.id
  });

  actors.forEach(actor => {
    addActor(actor, currentMovie.id);
  });

  directors.forEach(director => {
    addDirector(director, currentMovie.id);
  });

  genres.forEach(genre => {
    addGenre(genre, currentMovie.id);
  });
};

const addActor = async (actor: string, movieId?: number) => {
  const currentActor = await Actors.create(
    {actor_name: actor}
  );

  !!movieId && Movie_Actors.create({
    actorId: currentActor.id,
    movieId: movieId
  });
};

const addDirector = async (director: string, movieId?: number) => {
  const currentDirector = await Directors.create(
    {director_name: director}
  );

  !!movieId && Movie_Directors.create({
    actorId: currentDirector.id,
    movieId: movieId
  });
};

const addGenre = async (genre: string, movieId?: number) => {
  const currentGenre = await Genre.create(
    {genre: genre}
  );

  !!movieId && Movie_Genre.create({
    genreId: currentGenre.id,
    movieId: movieId
  });
};

module.exports = {
  getAllMovies,
  getAllMoviesByDirector,
  getAllMoviesByGenre,
  getAllMoviesWithActor,
  getFavoriteActors,
  getFavoriteDirectors,
  getFavoriteGenres,
  addMovie,
  addActor,
  addDirector,
  addGenre
};