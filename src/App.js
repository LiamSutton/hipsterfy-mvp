import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login'
import './App.css';
import secret from './Secrets.js'
import queryString from 'querystring'
import Playlists from './Playlists';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      access_token: null
    }
  }
  componentDidMount() {
    
    let access_token = window.location.hash.substring(14);
    console.log(access_token)
    if (access_token != null) {
      this.setState({
        access_token: access_token
      });
    }
  }
  render() {
    const CLIENT_ID = secret.client_id;
    const CLIENT_SECRET = secret.client_secret;
    const REDIRECT_URI = 'http://localhost:3000/callback';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const SCOPE = 'user-read-private user-read-email';
    let authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`
    let loggedIn = <h1>Logged in</h1>
    let loggedOut = <div><h2>PLease login below</h2> 
    <a className="btn btn-button-success-outline" href={authUrl}>LOGIN</a></div>
    return (
          <div className="App">
            <div className="App-Container">
              {this.state.access_token ? <Playlists auth={this.state.access_token} /> : loggedOut}
            </div>
      </div>
        );
  }
}

export default App;