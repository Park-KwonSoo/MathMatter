import React, { Component } from 'react';
import Header, { LoginButton, LogoutButton } from '../../components/Base/Header';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/modules/profile';
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
        const { logged } = this.props;
        const { handleLogout } = this;
        
        return (
            <Header>
                { logged
                    ? <LogoutButton onClick = {handleLogout}/> : <LoginButton/>
                } 
            </Header>
        );
    }
}

export default connect(
    (state) => ({
        logged : state.profile.get('logged')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })
)(HeaderContainer);