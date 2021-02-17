import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { HomeContainer } from '../containers/Home';

class Home extends Component {
    render() {
        return (
            <Route exact path = '/' component = { HomeContainer }/>
        );
    }
}

export default Home;