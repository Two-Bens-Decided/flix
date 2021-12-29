const fs = require('fs');
const axios = require('axios');
import path from 'path';
import {addMovie} from './index'
interface movieObj {
  [key:string]: string;
}
import movieJson from './sampleData.json'

const movies: movieObj[] = movieJson;


Promise.all(movies.map((elem: movieObj, idx: number) => {
  return addMovie(elem);
}))
  .then(() => console.log('all should be saved?'));

  // const options: any = {
  //   url: 'http://localhost:3000/api/users',
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: {
  //     "username": "Adam-n-Eve",
  //     "email_Oauth": "user.email_Oauth",
  //     "twitter_Oauth": "user.twitter_Oauth",
  //     "twitter_user_name": "adam@tweets",
  //     "first_name": "Adam",
  //     "last_name": "Eve",
  //     "profile_image_url": "user.profile_image_url",
  //     "age": 100000
  //     }
  // };
  // axios(options)

  Promise.all(movies.slice(0,5).map((elem: movieObj, idx: number) => {
    return addMovie(elem, 1);
  }))
    .then(() => console.log('all should be saved?'));

// console.log(movies);

