import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import WordChoosing from './WordChoosing';
import Button from '@mui/material/Button';
class MainPage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>
                
                <WordChoosing />
                
            </div>
        );
    }
}
export default MainPage;
// export default inject("DrawStore")(observer(Welcome));