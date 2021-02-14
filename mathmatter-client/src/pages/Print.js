import React, { Component } from 'react';
import { PrintInfo, PrintSet, PrintMenu, PrintResult, PrintType1, PrintType2, PrintType3 } from '../containers/Print'; 
import { Route } from 'react-router-dom';

class Print extends Component {
    render() {
        return (
            <div>
                <Route exact path = '/print' component = { PrintMenu }/>
                <Route path = '/print/info' component = { PrintInfo }/>
                <Route exact path = '/print/set' component = { PrintSet }/>
                <Route path = '/print/result/:printId' component = { PrintResult }/>
                <Route path = '/print/set/1' component = { PrintType1 }/>
                <Route path = '/print/set/2' component = { PrintType2 }/>
                <Route path = '/print/set/3' component = { PrintType3 }/>
            </div>
        );
    }
}

export default Print;