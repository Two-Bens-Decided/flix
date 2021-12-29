// import { Router } from 'express';
// import axios from 'axios';
// const GoogleRouter = Router();

// const { google_clientId } = process.env;

// function GoogleSignIn() {

//   const onSuccess = (res: Response) => {
//     axios.post('api/users',)
//   }
// }


// export default GoogleRouter;
// const {OAuth2Client} = require('google-auth-library');
// const CLIENT_ID = process.env.google_clientId;

// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);