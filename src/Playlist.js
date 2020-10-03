import React, { Component } from 'react'
import './Playlist.css'
class Playlist extends Component {
    constructor() {
        super();
        this.state = {
            leastPopularTrack: {name: '', artist: ''}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch(`https://api.spotify.com/v1/playlists/${this.props.id}/tracks`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth
            }
        }).then((Response) => {
            console.log(Response.json().then((data) => {
                let tracks = data.items;
                let details = tracks.map((track) => {
                    return {name: track.track.name, artist: track.track.artists[0].name, popularity: track.track.popularity}
                })
                details.sort(function(a, b) {return a.popularity - b.popularity});
                this.setState({
                    leastPopularTrack: details[0]
                });
            }))
        })
    }
    handleClick(e) {
        alert(this.state.leastPopularTrack.name)
    }

    render() {
        return(
            <div className="Playlist mx-auto my-auto">
                 <div className="Playlist-Card card bg-dark text-white" onClick={this.handleClick}>
                    <img className="Playlist-Image" height="320" width="320" src={this.props.image}/>
                    <div className="card-img-overlay">
                        <h2 className="Playlist-Image-Caption">{this.props.name}</h2>
                    </div>
                </div>
            </div>
                
        )
    }
}

export default Playlist