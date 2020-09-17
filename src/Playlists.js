import React, { Component } from 'react'

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
                                    console.log(data);
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
        return <h1>{playlist.name}</h1>
        })
        return(
            <div>
                {playlists}
            </div>
        )
    }
}

export default Playlists