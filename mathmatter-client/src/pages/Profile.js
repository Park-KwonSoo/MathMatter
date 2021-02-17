import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ProfileWrapper } from '../components/Profile';
import { ProfileInfo, ProfileSet, WithDraw } from '../containers/Profile';

class Profile extends Component {

    handleGoHome = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { handleGoHome } = this;

        return (
            <ProfileWrapper name = 'Profile' onClick = {handleGoHome}>
                <Route exact path = '/profile' component = { ProfileInfo }/>
                <Route path = '/profile/set' component = { ProfileSet }/>
                <Route path = '/profile/withdraw' component = { WithDraw }/>
            </ProfileWrapper>
        );
    }
}

export default Profile;