import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SingleTweet from "./SingleTweet";

const Twitter:FC = (props: any) => {
    const [title, setTitle] = useState('');
    const [tweets, setTweets] = useState([]);

    const handleTwitterSearch = (e: any) => {
        e.preventDefault();
        // console.log(title)
        // axios()
        const options: any = {
            url: 'http://localhost:3000/api/twitter/tweets',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            params: {
              title: title
            }
        }
        axios(options)
            .then(({data}) => {
                // console.log(res.data.data)
                setTweets(data.data)
            })
            .then(() => {
                // console.log(tweets)
                setTitle('');
            })       
    }

      // grab tweets for random movie on load
    useEffect(() => {
      console.log('did load');
      axios('http://localhost:3000/api/movies')
        .then((movies: any) => {
          return movies.data[Math.floor(Math.random() * movies.data.length)].title
        })
        .then((title) => {
          const options: any = {
            url: 'http://localhost:3000/api/twitter/tweets',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            params: {
              title: title
            }
        }
        axios(options)
            .then((res) => {
                setTweets(res.data.data)
            })
        })
    }, []);

    
    
    return (
      <>
      {/* input form */}
        <div className="formClass">
          <form onSubmit={e => e.preventDefault()}>
            <TextField fullWidth variant="outlined" label="Search Movie Tweets"
              value={title}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) =>
                setTitle(e.target.value)
              }
              style={{backgroundColor: 'white'}}
            />
            <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e: any) => handleTwitterSearch(e)}
            style={{background: 'purple', color: 'white'}}
            >Search Movie Tweets</Button>
          </form>
        </div>

        <div className="TwitterTweets">
            {tweets.map((tweet: any) => {
                // {console.log(tweet)}
                return <SingleTweet key={tweet.id} text={tweet.text}/>
            })

            }
        </div>
      </>
    )
  };
  
  export default Twitter;
  