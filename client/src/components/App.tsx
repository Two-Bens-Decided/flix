
import React, { FC, useState, useEffect } from 'react';



import Paths from '../Routes';
import NavigationBar from './NavigationBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './MovieDetail';

import axios from 'axios';
import Login from './Login';
import Profile from './Profile';
import TsParticles from './tsParticle/tsParticles';


const App:FC = () => {
  const [currentUser, setCurrentUser] = useState<any>();

  const getLoggedInUser = () => {
    axios.get('/verify')
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log('Unable to verify user', err);
      })
  };




// currentUser.photos[0].value
  //this only needs to run once, will update when the user logs out and is redirected to login page.
  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <>

    {!currentUser ?  <Login />
    :
    <>
    <Login user={currentUser} />
    <NavigationBar />
    <TsParticles />
    <Routes>
          {Paths.map((route: any, index: number) => {
            return <Route
              path={route.path}
              key={index}
              element={<route.component user={currentUser} />} />;
          })}
          <Route path='movies/:id' element={<MovieDetail />} />
          <Route path="*" element={<h2>404: Not found</h2>} />
        </Routes></>
}
    </>
  );
};


export default App;
