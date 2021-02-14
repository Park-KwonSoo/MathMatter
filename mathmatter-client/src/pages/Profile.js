import React, { Component } from 'react';
import { ProfileWrapper } from '../components/Profile';
import { ProfileInfo, ProfileSet, WithDraw } from '../containers/Profile';
import { Route } from 'react-router-dom';

class Profile extends Component {
    render() {
       return (
            <ProfileWrapper name = 'Profile'>
                <Route exact path = '/profile' component = { ProfileInfo }/>
                <Route path = '/profile/set' component = { ProfileSet }/>
                <Route path = '/profile/withdraw' component = { WithDraw }/>
            </ProfileWrapper>
       );
    }
}

export default Profile;