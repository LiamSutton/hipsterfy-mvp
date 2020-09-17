import React from 'react';
import logo from './logo.svg';
import Login from './Login'
import './App.css';
import secret from './Secrets.js'

function App() {
  
  const CLIENT_ID = secret.client_id;
  const CLIENT_SECRET = secret.client_secret;
  const REDIRECT_URI = 'http://localhost:3000/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const SCOPE = 'user-read-private user-read-email';
  let authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code&show_dialog=true`
  return (
    <div className="App">
      <div className="App-Container">
      <h1>H I P S T E R I F Y</h1>
      <p>Please login using the button below</p>
      
      <a 
        className="btn btn-success"
        href={authUrl}
      >Login to spotify
      </a>
      </div>
      
    </div>
  );
}

export default App;
/*
  Application Structure.

  1: User must authenticate themselves using the spotify /Authorization endpoint
  2: After recieving an access token the user will be redirected to a view wherein
     they will be able to see a PLAYLISTCOLLECTION component comprised of individual
     PLAYLIST components.
  3: When the user clicks an individual PLAYLIST component it will use the /Tracks
     endpoint to get a JSON aggregation of all tracks
  4: They will then be sorted by popularity ASC
  5: The application will then display a TRACK component which shows the information
     of the least popular track in the given playlist
*/