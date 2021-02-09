import React, { Component } from 'react';
import { PrintInfo, PrintSet, PrintMenu, PrintResult } from '../containers/Print'; 
import { Route } from 'react-router-dom';

class Print extends Component {
    render() {
        return (
            <div>
                <Route exact path = '/print' component = { PrintMenu }/>
                <Route path = '/print/info' component = { PrintInfo }/>
                <Route path = '/print/set' component = { PrintSet }/>
                <Route path = '/print/result/:printId' component = { PrintResult }/>
            </div>
        );
    }
}

export default Print;