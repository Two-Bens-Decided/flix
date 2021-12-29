// import React, { useState, createContext, useContext, FC } from 'react';
// // import { useGoogleLogin, GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
// import { GoogleLoginButton } from 'ts-react-google-login-component';
// import axios from 'axios';
// interface clientConfig {
//   client_id: string;
//   cookie_policy?: string;
//   scope?: string;
//   fetch_basic_profile?: boolean;
//   hosted_domain?: string;
//   openid_realm?: string;
//   ux_mode?: "popup" | "redirect";
//   redirect_uri?: string;
// }

// // const {google_clientID} = process.env;
// // console.log(google_clientID);

// const GoogleLogin:FC = () => {

//     const preLoginTracking = () => {
//         console.log('Attempting to login with Google');
//     }

//     const errorHandler = (error: string) => {
//         console.error(error)
//     }

    // const responseGoogle = (googleUser: gapi.auth2.GoogleUser) => {
    //     const id_token = googleUser.getAuthResponse(true).id_token
    //     const user = googleUser.getBasicProfile();

    //     console.log(user);

    //     const newUser = {
    //         first_name: user.getGivenName(),
    //         last_name: user.getFamilyName(),
    //         profile_image_url: user.getImageUrl(),
    //         email_Oauth: user.getEmail()
    //     }
    //     axios.post('/api/users/', newUser)
    //         .then(() => { console.log('Google User Saved')})
    //         .catch((err) => { console.log('Failure to save Google User', err)});

//     }

//         const clientConfig = { client_id: '757941118163-kftmst9av0n673t48c6e1te2444fa4b1.apps.googleusercontent.com' };
//         const signInOptions = { scope: 'profile'};

//         return (
//         <div>
//                 <GoogleLoginButton
//                     responseHandler={responseGoogle}
//                     clientConfig={clientConfig}
//                     singInOptions={signInOptions}
//                     preLogin={preLoginTracking}
//                     failureHandler={errorHandler}
//                 />
//         </div>
//         )

// }

// export default GoogleLogin;