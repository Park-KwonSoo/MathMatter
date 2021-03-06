import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/modules/auth';
import * as profileActions from '../../redux/modules/profile';

import { ProfileContent } from '../../components/Profile';
import { Error, InputWithLabel, JustLinkButton } from '../../components/Base';

import storage from '../../lib/storage';

//toDo : 백엔드에서 해쉬처리된 비밀번호 비교한 후, 일치하면 아이디 삭제하는 검증작업 추가하기
class WithDraw extends Component {

    setError = (message) => {
        const { ProfileActions } = this.props;
       
        ProfileActions.setError({
            message
        });
        
        return false;
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form : 'withdraw'
        });
    }

    handleWithDraw = async() => {
        const { logged } = this.props;
        if(!logged) this.setError('먼저 로그인을 해야합니다');
        
        try {
            const { AuthActions, withdraw } = this.props;
            const { password } = withdraw.get('form').toJS();

            await AuthActions.withDraw({
                password
            });

            storage.remove('loggedInfo');
            window.location.href = '/';

        }   catch(e) {
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    }

    render() {
        const { error } = this.props;
        const { handleChange, handleWithDraw } = this;

        return (
            <ProfileContent title = 'WithDraw'>
                <InputWithLabel
                name = 'password'
                placeholder = 'Check Password'
                onChange = {handleChange}
                />
                <JustLinkButton onClick = {handleWithDraw}>정말 회원 탈퇴하시겠습니까?</JustLinkButton>
                {
                    error && <Error>{error}</Error>
                }
            </ProfileContent>
        )
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        error : state.profile.get('error'),
        withdraw : state.auth.get('withdraw')
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })
)(WithDraw);