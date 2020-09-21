import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login'
import './App.css';
import secret from './Secrets.js'
import queryString from 'querystring'
import PlaylistView from './PlaylistView';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  
  constructor() {
    super();
    this.state = {
      access_token: null
    }
  }
  componentDidMount() {
    
    let access_token = window.location.hash.substring(14);
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
    let loggedOut = <div style={{marginTop: '100px'}} className="container">
      <h1 className="text-white">Please login with spotify to continue</h1> 
    <a style={{marginTop: '20px'}} type="button" className="btn btn-success" href={authUrl}>LOGIN</a>
    </div>
    return (
          <div className="App">
            <div className="container">
            <h1 className="display-4 text-white">H I P S T E R  F Y</h1>
              {this.state.access_token ? <PlaylistView auth={this.state.access_token} /> : loggedOut}
            </div>
          </div>
        );
  }
}

export default App;