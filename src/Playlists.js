import React, { Component } from 'react'
import './Playlists.css'
class Playlists extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth
            }
        })
            .then((response) => {
                console.log(response.json().then(
                    (data) => { 
                        fetch(`https://api.spotify.com/v1/users/${data.id}/playlists`, {
                            method: 'GET', headers: {
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + this.props.auth
                            }
                        })
                            .then((response) => {
                                console.log(response.json().then((data) => {
                                    this.setState({
                                        items: data.items
                                    })
                                }))
                            })
                     }
                ));
            });
    }
    render() {
        let playlists = this.state.items.map((playlist) => {
            return(
                <li key={playlist.id} className="row" style={{padding: "10px"}}>
                    <div className="col-sm-auto">
                        <img width="200" height="200" src={playlist.images[0].url}></img>
                    </div>
                    
                    <div className="col-sm-auto">
            <h3>{playlist.name}</h3>
                    </div>
                </li>
            )
        })
        return(
            <div>
            <ul className="list-group" id="playlist-list">
                    <h3 className="list-group-heading">Your playlists</h3>
                    {playlists}
                </ul>
            </div>
        )
    }
}

export default Playlists