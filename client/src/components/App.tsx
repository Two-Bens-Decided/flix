import React, { FC, useState, useEffect } from 'react';
import Paths from '../Routes';
import NavigationBar from './NavigationBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './MovieDetail';
import axios from 'axios';
import Login from './Login';
import TsParticles from './tsParticle/tsParticles';
import Theme from './Theme';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Switch from '@mui/material/Switch';





const App:FC = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [currentTheme, setCurrentTheme] = useState<any>(false);


  const theme = createTheme({
    palette: {
      type: currentTheme ? 'dark' : 'light'
    }
  })

  const getLoggedInUser = () => {
    axios.get('/verify')
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log('Unable to verify user', err);
      });
  };



// currentUser.photos[0].value
  //this only needs to run once, will update when the user logs out and is redirected to login page.
  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <>
      {!currentUser
      ? <Login />
      : (<>
          <Login user={currentUser} />
          <ThemeProvider theme={theme}>
            <Switch checked={currentTheme} onChange={() => setCurrentTheme(!currentTheme)}/>

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
          </Routes>
          </ThemeProvider>
        </>
      )}
    </>
  );
};


export default App;
