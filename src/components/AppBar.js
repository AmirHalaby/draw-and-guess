import React, { Component } from 'react';
import { observer , inject } from 'mobx-react'

class AppBar extends Component {
    constructor() {
        super();
        this.state = {
        name : '' ,
        price : '' ,
        quantity :''
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.drawStore.playerName}</h1>

            </div>
        );
    }
}
export default inject("drawStore")(observer(AppBar));
