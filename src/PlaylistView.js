import React, { Component } from 'react'
import './PlaylistView.css'
import Playlist from './Playlist'
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
                <Playlist id={playlist.id} name={playlist.name} image={playlist.images[0].url} auth={this.props.auth}/>
            )
        })
        return(
            <div>
                <h1 className="display-3 text-white">H I P S T E R - I F Y</h1>
                <div className="card-group">
                    {playlists}
                </div>
            </div>
        )
    }
}

export default Playlists