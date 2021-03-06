import React, {FC, SyntheticEvent, useState} from 'react';
import axios from 'axios';
import DetectedText from './DetectedText';
import { Button } from '@material-ui/core';

const SearchByMoviePoster:FC<any> = (props) => {
  const [image, setImage] = useState('');
  const [text, setText] = useState<string[]>([]);

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    setImage(URL.createObjectURL(file));
    const data = new FormData();
    data.append('image', file, file.name);
    axios.post('/api/photos/detectText', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(({data}) => {
        console.log(data);
        setText(data.map((elem: any) => elem.description));
      })
      .catch((err: any) => {
        console.log('error POSTing file');
        console.error(err);
      });
  };

  const handleRemove = (e: SyntheticEvent) => {
    e.preventDefault();
    setImage('');
  };

  return (
    <div
      className='poster-search-dev'
      style={{
        marginLeft: '30px',
        marginTop: '30px',
      }}
    >
      <div
        style={{
          color: 'gold',
        }}
      >
        <h1>Upload a Movie Poster to find More Details</h1>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'left',
          justifyContent: 'left',
        }}
      >
        {!!image && (
          <div>
          <img alt="not found" width={"500px"} src={image} />
          <br />
          <Button onClick={handleRemove}>Remove</Button>
          </div>
        )}
        <form
          style={{
            width: '100px',
            marginLeft: '10px'
          }}
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="myImage"
            onChange={handleChange}
          />
        </form>
        <div
          style={{
            display: 'inline-table',
            marginRight: '30px'
          }}
        >
          {!!text && (
            text.map((text, idx) => {
              return <DetectedText key={idx} text={text} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchByMoviePoster;
