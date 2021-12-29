import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';

interface MovieObj {
  id: number;
  movie_id: string;
  title: string;
  release_date: string;
  description: string;
  trailer_url: string;
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const MovieDetail:FC = () => {
  const {id} = useParams();
  const [currentMovie, setCurrentMovie] = useState<null | MovieObj>(null);

  const getMovie = (id: number) => {
    axios.get(`/api/movies/${id}`)
      .then(({data}) => {
        setCurrentMovie(data);
      })
      .catch((err: any) => {
        console.log('error getting movie', err);
      });
  };

  useEffect(() => {
    getMovie(Number(id));
  }, []);

  if (!currentMovie) {
    return <h2>Loading</h2>;
  } else {
    const {movie_id, title, release_date, description, trailer_url} = currentMovie;
    return (
      <>
        <h1>{title}</h1>
        <h3>{release_date}</h3>
        <iframe width='1000' height='600' src={trailer_url} frameBorder='0'></iframe>
        <p>{description}</p>
      </>
    );
  }
};

export default MovieDetail;
