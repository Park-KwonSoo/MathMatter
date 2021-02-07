import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';

import { HomeWrapper, IsLoggin, NotLoggin } from '../../components/Home';

class HomeContainer extends Component {

    handleGetProfile = async() => {
        const { logged, ProfileActions } = this.props;
        
        if(!logged)
            this.setError("먼저 로그인을 해야 합니다.");

        try {
            await ProfileActions.getProfileInfo();
  
            console.log("프로필 함수 불러오기 성공");

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
                    <IsLoggin to ='/profile' onClick = {handleGetProfile}>
                        프로필메뉴
                    </IsLoggin>
                    <IsLoggin to = '/print'>
                        프린트목록
                    </IsLoggin>
                    <IsLoggin to = '/write'>
                        게시판
                    </IsLoggin>
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