import React, { Component } from 'react'
import './Playlist.css'
import LeastPopularModal from './LeastPopularModal.js'

class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            leastPopularTrack: {name: '', artist: '', showModal: false}
        }
    }

    componentDidMount() {
        fetch(`https://api.spotify.com/v1/playlists/${this.props.id}/tracks`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth
            }
        }).then((Response) => {
            (Response.json().then((data) => {
                let tracks = data.items;
                console.log(data)
                let details = tracks.map((track) => {
                    if ('images' in track.track.album) {
                        return {name: track.track.name, artist: track.track.artists[0].name, popularity: track.track.popularity, img: track.track.album.images[0].url}
                    } else {
                        return {name: track.track.name, artist: track.track.artists[0].name, popularity: track.track.popularity, img: ''}
                    }
                        
                })
                details.sort(function(a, b) {return a.popularity - b.popularity});
                this.setState({
                    leastPopularTrack: details[0]
                });
            }))
        })
    }
    render() {
        return(
            <div className="col-sm-auto">
                <div style={{marginBottom: '10px', marginTop: '10px', verticalAlign: 'middle', border: '5px solid black', borderRadius: '10px'}} className="card bg-dark text-white" onClick={this.handleClick}>
                <img className="rounded mx-auto d-block playlist-image" height="320" width="320" src={this.props.image} />
                    <div className="card-img-overlay d-flex" style={{alignItems: 'center'}}>
                        <h2 className="align-self-center mx-auto">{this.props.name}</h2>
                    </div>
                </div>
                <LeastPopularModal buttonLabel="Get Least popular song" track={this.state.leastPopularTrack} className="modal-dialog modal-dialog-centered leastPopularModal col-sm-12"/>
            </div>
        )
    }
}

export default Playlist