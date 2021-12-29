import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

interface currentMovie {
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


const Discover:FC = (props: any) => {
  const [currentMovie, setCurrentMovie] = useState<null | currentMovie >(null);
  const [genresList, setGenresList] = useState([]);
  const [directorsList, setDirectorsList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [movieList, setMovieList] = useState([]);



  const handleNextClick = () => {
    getRandomMovie();
  }
  const getGenresList = () => {
    axios('http://localhost:3000/api/genres/')
      .then((data) => {
        const result = data.data.map((movie: any) => movie.genre);
        setGenresList(result)
      })
  }
  const getDirectorsList = () => {
    axios('http://localhost:3000/api/directors/')
      .then((data) => {
        const result = data.data.map((movie: any) => movie.director_name);
        setDirectorsList(result)
      })
  }

  const getActorsList = () => {
    axios('http://localhost:3000/api/actors/')
      .then((data) => {
        const result = data.data.map((movie: any) => movie.actor_name);
        setActorsList(result)
      })
  }

  const getMovieList = () => {
    axios('http://localhost:3000/api/movies/')
      .then((data) => {
        
        // const result = data.data.map((movie: any) => movie.actor_name);
        setMovieList(data.data)
      })
  }

  const getRandomMovie = () => {
    axios('http://localhost:3000/api/movies/')
        .then((data) => {
          setMovieList(data.data)
          const randomNum = Math.floor(Math.random() * 250);
          setCurrentMovie(data.data[randomNum])
        })
  }

  const saveMovie = (movie: any) => {
    axios.post('/api/movies/saveMovie/', movie)
  }


    useEffect(() => {
      // getGenresList();
      // getDirectorsList();
      // getActorsList();
      // axios('http://localhost:3000/api/movies/')
      //   .then((data) => {
      //     setMovieList(data.data)
      //     const randomNum = Math.floor(Math.random() * 250);
      //     setCurrentMovie(data.data[randomNum])
      //   })
      getRandomMovie()
        
    }, [])
    return (
      <div>
        Disover component
        {/* {console.log(genresList)}
        {console.log(directorsList)}
        {console.log(actorsList)} */}
        {console.log(movieList)}
        {console.log(currentMovie)}
        <div>
            <h1>Title: {!!currentMovie ? currentMovie.title : ''}</h1>
            <iframe width="1000" height="600" src={!!currentMovie ? currentMovie.trailer_url: ''} frameBorder="0"></iframe>
            {/* <Button type="submit" onClick={()=>{}} variant="contained" id="outlined-basic" color="primary">Add movie</Button> */}
            <h2>Plot: {!!currentMovie ? currentMovie.description : ''}</h2>
            <h2>Release: {!!currentMovie ? currentMovie.release_date : ''}</h2>
          </div>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => handleNextClick()}
        >
            Get a New Movie
        </Button>
      </div>
    )
  };
  
  export default Discover;
  