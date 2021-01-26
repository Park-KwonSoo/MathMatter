import React, { Component } from 'react';
import Header, { LoginButton } from '../../components/Base/Header';
import { connect } from 'react-redux';
import * as ProfileActions from '../../redux/modules/profile';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';

class HeaderContainer extends Component {

    handleLogout = async() => {
        const { ProfileActions } = this.props;
        try {
            await ProfileActions.logout();
        }   catch(e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/'; //홈페이지 새로 고침
    }

    render() {
        const { user } = this.props;
        
        return (
            <Header>
                 <LoginButton/>
            </Header>
        );
    }
}

export default HeaderContainer;