import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/modules/auth';
import * as profileActions from '../../redux/modules/profile';

import queryString from 'query-string';
import { ProfileContent, Information, SettingButton } from '../../components/Profile';
import { Error } from '../../components/Base';

class ProfileInfo extends Component {
    
    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined)
            this.setError("세션이 만료되었습니다.");
    }

    componentWillUnmount() {
        this.setError(null);
    }

    setError = (message) => {
        const { ProfileActions } = this.props;
        ProfileActions.setError({
            message
        });
        return false;
    }

    
    render() {
        const { error } = this.props;
        const { userId, userName, email, phoneNumber, birth } = this.props.profileInfo;

        return (
            <ProfileContent title = {userId}>
                <Information name = '이름'>
                    {userName}
                </Information>
                <Information name = '이메일'>
                    {email}
                </Information>
                <Information name = '휴대폰 번호'>
                    {phoneNumber}
                </Information>
                <Information name = '생년 월일'>
                    {birth}
                </Information>
                {
                    error && <Error>{error}</Error>
                }
                <SettingButton to ='/profile/set'>프로필 정보 설정</SettingButton>
            </ProfileContent>
        );
    }
}

export default connect (
    (state) => ({
        error : state.profile.get('error'),
        profileInfo : state.profile.get('profileInfo')
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })

)(ProfileInfo);