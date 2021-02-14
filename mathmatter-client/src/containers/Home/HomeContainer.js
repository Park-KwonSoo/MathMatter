import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';

import { HomeWrapper, NotLoggin } from '../../components/Home';
import { SelectButton } from '../../components/Base';

class HomeContainer extends Component {

    handleGetProfile = async() => {
        const { logged, ProfileActions } = this.props;
        
        if(!logged)
            this.setError("먼저 로그인을 해야 합니다.");

        try {
            await ProfileActions.getProfileInfo();
            
        }   catch(e) {
            console.log(e);
            this.setError("프로필 정보를 불러오는데 실패했습니다.");
        }
    }

    render() {
        const { logged } = this.props;
        const { handleGetProfile } = this;

        if(logged) {
            return (
                <HomeWrapper>
                    <SelectButton to = '/profile' onClick = {handleGetProfile}>
                        내 프로필
                    </SelectButton>
                    <SelectButton to = '/print'>
                        프린트
                    </SelectButton>
                    <SelectButton to = '/write'>
                        게시판
                    </SelectButton>
                </HomeWrapper>
            )
        } else  
            return (
            <HomeWrapper>
                <NotLoggin/>
            </HomeWrapper>
            )
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        profileInfo : state.profile.get('profileInfo')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })
)(HomeContainer);