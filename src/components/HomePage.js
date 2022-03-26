import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import AppBar from './AppBar';
import MainPage from './MainPage';
import Guessing from './Guessing';
class HomePage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>    
                <AppBar />
                <MainPage />    
                {/* <Guessing /> */}
            </div>
        );
    }
}
export default HomePage;
// export default inject("DrawStore")(observer(Welcome));