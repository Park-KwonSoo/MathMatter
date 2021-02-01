import React, { Component } from 'react';
import { HomeContainer } from '../containers/Home';
import { Route } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Route exact path = '/' component = { HomeContainer }/>
        );
    }
}

export default Home;