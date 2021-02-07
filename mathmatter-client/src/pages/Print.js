import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { PrintInfo, PrintSet, PrintMenu, PrintResult } from '../containers/Print'; 

class Print extends Component {
    render() {
        return (
            <div>
                <Route exact path = '/print' component = {PrintMenu}/>
                <Route path = '/print/info' component = {PrintInfo}/>
                <Route path = '/print/set' component = {PrintSet}/>
                <Route path = '/print/result' component = {PrintResult}/>
            </div>
        )
    }
}

export default Print;