import React, {useState, FC, useEffect, SyntheticEvent} from 'react';
import axios from 'axios';
import useStyles from "../styles/profile.styles";
import { PropTypes } from '@material-ui/core';
import { useNavigate } from 'react-router';

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
  CardActionArea,
  Avatar,
  Stack,
  Typography,
  Skeleton,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Movie } from '@material-ui/icons';



const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ActorsObj {
  actor_name: string;
}

interface UserObj {
  [key: string] : any;
}






const Profile:FC<any> = ({user}) => {
  //User profile object
  const [currentUser, setCurrentUser] = useState<UserObj>(user);

  //User favorites {movies, actors, genres, directors}
  const [favoriteActors, setFavoriteActors] = useState<null | Array<object>>(null);
  const [favoriteDirectors, setFavoriteDirectors] = useState<any>();
  const [favoriteGenres, setFavoriteGenres] = useState<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<any>();

  //MUI states
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  //Used to get all favorites upon initial load.
  const getAllFavorites = (userId: number) => {
    const getActors = axios.get(`/api/users/actors/${userId}`);
    const getDirectors = axios.get(`/api/users/directors/${userId}`);
    const getGenres = axios.get(`/api/users/genres/${userId}`);
    const getMovies = axios.get(`/api/users/movies/${userId}`);

    axios.all([getActors, getDirectors, getGenres, getMovies])
      .then(responseArr => {
        setFavoriteActors(responseArr[0].data.actors);
        setFavoriteDirectors(responseArr[1].data.directors);
        setFavoriteGenres(responseArr[2].data.genres);
        setFavoriteMovies(responseArr[3].data.movies)
        console.log('Favorite Actors', responseArr[0].data.actors)
        console.log('Favorite directors', responseArr[1].data.directors)
        console.log('Favorite genres', responseArr[2].data.genres)
        console.log('favorite movies', responseArr[3].data.movies)

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
  const removeFavorite = () => {
    console.log('hello');
    console.log('target title', favoriteMovies.title);
    axios.delete(`/api/users/movies/${currentUser.id}`)
    .then(() => { console.log('Removed favorite')})
    .catch(() => {console.log('Failed to remove')})
  };
  //




  const handleClick = (e: SyntheticEvent) => {
    // e.preventDefault();
    console.log(e.target);
    removeFavorite();

  };

  const navigate = useNavigate();
  const handleNavigate = (e: SyntheticEvent) => {
    e.preventDefault();
    // navigate(`/movies/${favoriteMovies.id}`);
  };

  const classes = useStyles();
  //Cover photo is static, requires s3 integration for this part
  return(
    <>
      Profile
      <div>
      {!currentUser ? null :
      <><Card className={classes.root}>
            <CardMedia className={classes.media} image={currentUser.profile_image_url} title="Cover" />
            <Avatar src={currentUser.profile_image_url} className={classes.profileImage} />
            <div className={classes.profileInfoContainer}>
              <Typography
                align={"center"}
                className={currentUser.username}
                variant="h4"
                gutterBottom
              >
                {currentUser.username}
              </Typography>
              <Typography
                align={"center"}
                variant="subtitle2"
                gutterBottom
                className={currentUser.username}
              >
                {!currentUser.twitter_user_name ? null : `@${currentUser.twitter_user_name}`}
              </Typography>
            </div>
            <CardContent className="user-contentcontainer">
              <div>
                Favorite Movies row
                <Stack direction='row' spacing={2}>
                  {!favoriteMovies ? null : favoriteMovies.map((movie: any, key: number) => {
                    return (
                      <div>
                        <ClearIcon onClick={() => handleClick(movie.id)} />
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea onClick={handleNavigate} >
                            <CardMedia
                              component="img"
                              height="140"
                              image={movie.thumbnailUrl}
                              alt="movie image" />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="div">
                                {movie.title}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>
                    );
                  })}
                </Stack>
              </div>
            </CardContent>
          </Card>

          <div>
              Favorite Actors row
              <Stack direction='row' spacing={2}>
                {!favoriteActors ? null : favoriteActors.map((actor: any, key: number) => {
                  return (
                    <Card>
                      <CardContent>
                        <Typography>
                          {actor.actor_name}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </div></>
}
</div>
</>


  );
};

export default Profile;