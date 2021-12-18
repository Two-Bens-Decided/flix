import React, {useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";




const SearchMovie = (props :any) => {
  interface Movie {imDbId: string; title: string; year: string; videoDescription: string; linkEmbed: string};
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<Movie | null>(null);




  const grabMovieInfo = (movieName: string) : any => {
    return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_0ey76rg5/${movieName}`)
     .then((data: any) => {
       return {data}
     }).then((data: any) => {
      const {id} = data.data.data.results[0];
      return id;
    }).then((data: any) => {
      return axios.get(`https://imdb-api.com/en/API/Trailer/k_0ey76rg5/${data}`)
    }).then((data: any) => {
    setSearchResults(data.data);
    return data.data
    }).catch((error: any) => {
       console.log(error);
     });
  }

  // movieObj: object param
  const addMovieInfo = () => {
    return axios.get(`https://imdb-api.com/en/API/Title/k_4pd82hff/${searchResults?.imDbId}`)
    .then((data: any) => {
      // console.log(data.data);
      const newData = {
        genres: data.data.genres,
        actors: data.data.stars,
        directors: data.data.directors,
        thumbnailUrl: data.data.thumbnailUrl,
      }

      const fullData = {...newData, ...searchResults}
      console.log(fullData);
      axios.post('/api/movies/insertMovie', fullData)
    })
  }


  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event :any) => {
    event.preventDefault();
    grabMovieInfo(searchVal);
    setSearchVal('');
  };


  if (!searchResults) {
  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
        <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
      </div>
    </div>
  );
  } else {
    return (
      <div>
        <div>
          <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
          <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
        </div>
        <div>
          <div>
            <h1>Title: {searchResults.title}</h1>
            <iframe width="1000" height="600" src={searchResults.linkEmbed} frameBorder="0"></iframe>
            <Button type="submit" onClick={addMovieInfo} variant="contained" id="outlined-basic" color="primary">Add movie</Button>
            <h2>Plot: {searchResults.videoDescription}</h2>
            <h2>Release: {searchResults.year}</h2>
          </div>
        </div>
      </div>
    );
  }
};


export default SearchMovie;