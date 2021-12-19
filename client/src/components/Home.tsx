import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import CarouselItem from './CarouselItem';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

// using props:any because I'm not sure if I'll pass props to this component
const Home:FC = (props: any) => {
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [directorsMovies, setDirectorsMovies] = useState({});
  const [actorsMovies, setActorsMovies] = useState({});

  interface MovieObj {
    id: number;
    movie_id: string;
    title: string;
    release_date: string;
    description: string;
    trailer_url: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  interface MovieStorage {
    [key: string]: MovieObj[];
  }

  interface Actor {
    id: number;
    actor_name: string
  }

  interface Director {
    id: number;
    director_name: string;
  }

  interface Genre {
    id: number;
    genre: string;
  }
  // need to replace :id with the user id
  const getGenres = () => {
    axios.get('/api/genres/')
      .then(({data}) => setGenres(data))
      .catch(() => console.log('failed to get genres'));
  };
  // need to replace :id with the user id
  const getDirectors = () => {
    axios.get('/api/directors/')
      .then(({data}) => setDirectors(data))
      .catch(() => console.log('failed to get directors'));
  };
  // need to replace :id with the user id
  const getActors = () => {
    axios.get('/api/actors/')
      .then(({data}) => setActors(data))
      .catch(() => console.log('failed to get actors'));
  };

  const getGenreMovies = () => {
    const movies: MovieStorage = {};
    genres.forEach(((genre: Genre) => {
      axios.get('/api/movies/genres/' + genre.id)
        .then(({data}) => movies[genre.genre] = data)
        .catch(() => console.log('failed to get movies by genre'))
        .finally(() => setGenreMovies(movies));
    }));
  };

  const getActorMovies = () => {
    const movies: MovieStorage = {};
    actors.forEach(((actor: Actor) => {
      axios.get('/api/movies/actors/' + actor.id)
        .then(({data}) => movies[actor.actor_name] = data)
        .catch(() => console.log('failed to get movies by Actor'))
        .finally(() => setActorsMovies(movies));
    }));
  };

  const getDirectorMovies = () => {
    const movies: MovieStorage = {};
    directors.forEach(((director: Director) => {
      axios.get('/api/movies/directors/' + director.id)
        .then(({data}) => movies[director.director_name] = data)
        .catch(() => console.log('failed to get movies by director'))
        .finally(() => setDirectorsMovies(movies));
    }));
  };

  useEffect(() => {
    getGenres();
    getActors();
    getDirectors();
  }, []);

  useEffect(() => {
    getGenreMovies();
  }, [genres]);

  useEffect(() => {
    getActorMovies();
  }, [actors]);

  useEffect(() => {
    getDirectorMovies();
  }, [directors]);

  const buildCarousel = (moviesObj: MovieStorage) => {
    return Object.keys(moviesObj).map((key) => {
      return (
        <>
          <h2 className="carousel-categories">{key}</h2>
          <Carousel
            className={`${key}-carousels`}
            NextIcon={<ArrowForwardIosOutlinedIcon />}
            PrevIcon={<ArrowBackIosOutlinedIcon />}
            animation='slide'
            autoPlay={false}
          >
            {
              moviesObj[key].slice(0, 10).map((movie: MovieObj) => <CarouselItem item={movie} key={movie.movie_id} />)
            }
          </Carousel>
        </>
      );
    });
  }

  return (
    <>
      <div className="genre-carousels">
        {!!Object.keys(genreMovies) && buildCarousel(genreMovies)}
      </div>
      <div className="directors-carousels">
        {!!Object.keys(directorsMovies) && buildCarousel(directorsMovies)}
      </div>
      <div className="actors-carousels">
        {!!Object.keys(actorsMovies) && buildCarousel(actorsMovies)}
      </div>
    </>
  )
};

export default Home;
