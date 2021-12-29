import React, {useState, FC, useEffect} from 'react';
import axios from 'axios';

//MUI
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  Autocomplete,
  CircularProgress,
  Avatar,
  Typography,
  Skeleton,
  Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { withStyles } from '@material-ui/core/styles';

const Profile:FC<any> = ({user}) => {
  //User profile object
  const [currentUser, setCurrentUser] = useState<any>();

  //User favorites {movies, actors, genres, directors}
  const [favoriteActors, setFavoriteActors] = useState<any>();
  const [favoriteDirectors, setFavoriteDirectors] = useState<any>();
  const [favoriteGenres, setFavoriteGenres] = useState<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<any>();


  //Used to get all favorites upon initial load.
  const getAllFavorites = (userId: number) => {
    const getActors = axios.get(`/api/actors/${userId}`);
    const getDirectors = axios.get(`/api/directors/${userId}`);
    const getGenres = axios.get(`/api/genres/${userId}`);
    // const getMovies = axios.get(`/api/movies/${userId}`);

    axios.all([getActors, getDirectors, getGenres])
      .then(responseArr => {
        setFavoriteActors(responseArr[0]);
        setFavoriteDirectors(responseArr[1]);
        setFavoriteGenres(responseArr[2]);
        console.log('Favorite Actors', responseArr[0])
      }).catch((err) => { console.log('Unable to retrieve user favorites', err); })
  };

    useEffect(() => {
      setTimeout(() => {
        setCurrentUser(user);
        getAllFavorites(user.id);
      }, 2000)
    }, [user]);

//INDIVIDUAL UPDATE FUNCTIONS
//used for removing user favorites from the page.

  //   const getFavActors = (userId: number) => {
  //     axios.get(`/api/actors/${userId}`)
  //       .then(({data}) => {
  //         setFavoriteActors(data)})
  //       .catch(() => console.log('Failed to get favorite actors'));
  //   };
  //   useEffect(() => {
  //     getFavActors(currentUser?.id);
  //   }, [favoriteActors])


  //   const getFavDirectors = (userId: number) => {
  //     axios.get(`/api/directors/${userId}`)
  //     .then(({data}) => {
  //       setFavoriteDirectors(data)})
  //     .catch(() => console.log('Failed to get favorite directors'));
  //   };
  //   useEffect(() => {
  //     getFavDirectors(currentUser?.id);
  //   }, [favoriteDirectors])


  //   const getFavGenres = (userId: number) => {
  //     axios.get(`/api/genres/${userId}`)
  //     .then(({data}) => {
  //       setFavoriteGenres(data)})
  //     .catch(() => console.log('Failed to get favorite genres'));
  //   };
  //   useEffect(() => {
  //     getFavGenres(currentUser?.id);
  //   }, [favoriteGenres])

  //     //TODO: Movies needs backend routes for user favorites
  // const getFavMovies = (userId: number) => {
  //   axios.get(`/api/movies/${userId}`)
  //   .then(({data}) => {
  //     setFavoriteMovies(data[userId])})
  //   .catch(() => console.log('Failed to get favorite movies'));
  // };
  // useEffect(() => {
  //   getFavMovies(currentUser?.id);
  // }, [favoriteMovies])

  // useEffect(() => {
  //   //setTimeout b/c will throw 'unmounted' error without it.
  //   setTimeout(() => {
  //     setCurrentUser(children);
  //   })
  // }, [children]);


  //is there a way to set this up so that depending on whatever is clicked, that clicked item will be identified and passed
  //into the axios put request, instead of creating a request for each item type
  const updateFavorite = () => {
    //on target click, remove favorite
  };

  const handleClick = (e: any) => {
    e.preventDefault();

  };

  return(
    <>
      Profile
    </>
  );
};

export default Profile;