import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { WriteMenu, Board, ViewWrite, Writing, ViewMyWrite, EditMyWrite } from '../containers/Write'; 

class Write extends Component {
    render() {
        return (
            <div>
                <Route exact path = '/write' component = { WriteMenu }/>
                <Route path = '/write/board' component = { Board } />
                <Route path = '/write/view/:postId' component = { ViewWrite }/> 
                <Route path = '/write/write' component = { Writing }/>
                <Route path = '/write/mywrite' component = { ViewMyWrite }/>
                <Route path = '/write/edit/:postId' component = { EditMyWrite } />
            </div>
        );
    }
};

export default Write;