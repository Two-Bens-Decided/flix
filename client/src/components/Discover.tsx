import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';

import SingleTweet from './SingleTweet'

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
            getTweets();
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
            getTweets();
          })
      }
    }


    const getTweets = () => {
      const options: any = {
        url: 'http://localhost:3000/api/twitter/tweets',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        params: {
          title: currentMovie?.title
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
        getTweets();
      }, [])
      return (
        <div>
          <div>
            <h1
              style={{color: 'white', textAlign: 'center'}}
            >{!!currentMovie ? currentMovie.title : ''}</h1>
            <div
            style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}
            >
            <iframe width="1000" height="600" src={!!currentMovie ? currentMovie.trailer_url: ''} frameBorder="0"></iframe>
            </div>
            {/* <Button type="submit" onClick={()=>{}} variant="contained" id="outlined-basic" color="primary">Add movie</Button> */}
            <h2
              style={{color: 'white', textAlign: 'center'}}
            >{!!currentMovie ? currentMovie.description : ''}</h2>
            <h2
              style={{color: 'white', textAlign: 'center'}}
            >Release Date: {!!currentMovie ? currentMovie.release_date : ''}</h2>
          </div>
        <Button 
          variant="contained" 
          color="secondary" 
          style={{background: 'purple', color: 'white'}}
          onClick={() => handleNextClick()}
        >
            Get a New Movie
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          style={{background: 'purple', color: 'white', float: 'right'}}
          onClick={() => handleSaveClick()}
        >
            Save movie
        </Button>
        <br/>
        <div className="TwitterTweets">
            {tweets.map((tweet: any) => {
                // {console.log(tweet)}
                return <SingleTweet key={tweet.id} text={tweet.text}/>
            })

            }
        </div>

      </div>
    )
  };

  export default Discover;