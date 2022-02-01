import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import SingleTweet from './SingleTweet'

//MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

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


const Discover:FC<any> = ({user}) => {
  const [currentUser, setCurrentUser] = useState<any>(user);
  const [tweets, setTweets] = useState([]);

  const [currentMovie, setCurrentMovie] = useState<null | currentMovie >(null);
  const [genresList, setGenresList] = useState([]);
  const [directorsList, setDirectorsList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [movieList, setMovieList] = useState([]);



  const handleNextClick = () => {
    getRandomMovie();
  }

  const handleSaveClick = () => {
    saveMovie();
    getRandomMovie();
  }
  const getGenresList = () => {
    axios('/api/genres/')
    .then(({data}) => {
      const result = data.map((movie: any) => movie.genre);
        setGenresList(result)
      })
    }
    const getDirectorsList = () => {
      axios('/api/directors/')
        .then(({data}) => {
          const result = data.map((movie: any) => movie.director_name);
          setDirectorsList(result)
        })
    }

    const getActorsList = () => {
      axios('/api/actors/')
        .then(({data}) => {
          const result = data.map((movie: any) => movie.actor_name);
          setActorsList(result)
        })
    }

    const getMovieList = () => {
      axios('/api/movies/')
        .then(({data}) => {

          // const result = data.map((movie: any) => movie.actor_name);
          setMovieList(data)
        })
    }

    const getRandomMovie = () => {
      axios('/api/movies/')
          .then((data) => {
            setMovieList(data.data)
            const randomNum = Math.floor(Math.random() * 250);
            setCurrentMovie(data.data[randomNum])
            getTweets(data.data[randomNum])
          })
    }

    const saveMovie = () => {
      if(user) {
        axios({
          method: 'post',
          url: '/api/users/user-movies',
          data: {
            movieId: currentMovie?.id,
            userId: user.id
          }
        })
          .then(() => {
            getRandomMovie();
          })
      }
    }


    const getTweets = (movie: any) => {
      console.log('curr movie', movie)
      const options: any = {
        url: '/api/twitter/tweets',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        params: {
          title: movie?.title
        }
    }
    axios(options)
        .then(({data}) => {
          setTweets(data.data)
        })
    }


      useEffect(() => {
        getRandomMovie();
        setCurrentUser(user);        
      }, [])
      return (
        <div>
          <div>
            <Grid container
                  direction='column'
                  justifyContent="center"
                  alignItems='center'
                  spacing={1}
                  >
              <Typography variant='h1' align='center'>
              {!!currentMovie ? currentMovie.title : ''}
              </Typography>

              <Card
                  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: 'auto', width: 'auto'}}
              >
              <iframe width="860"
                      height="600"
                      src={!!currentMovie ? currentMovie.trailer_url: '/assets/flixar.png'} frameBorder="0">
              </iframe>
              </Card>

              <Grid item xs='auto'
                style={{backgroundColor: '#A4A4A4'}}
              >
                <Typography variant='h4' align='left'>
                {!!currentMovie ? currentMovie.description : ''}
                </Typography>
              </Grid>

              <Typography variant='h5' align='center'>
              Release Date: {!!currentMovie ? currentMovie.release_date : ''}
              </Typography>
            </Grid>
          </div>


        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor: '#CBAA1A'}}
          onClick={() => handleNextClick()}
        >
            Get a New Movie
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor: '#CBAA1A', float: 'right'}}
          onClick={() => handleSaveClick()}
        >
            Save movie
        </Button>

        <div className="TwitterTweets"
          style={{
            margin: 'auto',
            width: '50%'
          }}
        >
            {tweets.map((tweet: any) => {
                // {console.log(tweet)}
                return (<Box sx={{border: 1, borderColor: "primary.main"}}>
                          <Typography variant='h6'>
                            <SingleTweet key={tweet.id} text={tweet.text}/>
                          </Typography>
                        </Box>
                        );
            })
            }
        </div>
      </div>
    )
  };

  export default Discover;