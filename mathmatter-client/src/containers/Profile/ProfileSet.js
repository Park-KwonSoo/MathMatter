import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/modules/auth';
import * as profileActions from '../../redux/modules/profile';

import { ProfileContent, Information, SaveButton } from '../../components/Profile';
import { Error, InputWithLabel } from '../../components/Base';

import queryString from 'query-string';

class ProfileSet extends Component {

    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined)
            this.setError("세션이 만료되었습니다.");
    }

    componentWillUnmount () {
        const { ProfileActions } = this.props;
        ProfileActions.initializeChangeInfo();
    }
    
    setError = (message) => {
        const { ProfileActions } = this.props;
        ProfileActions.setError({
            message
        });
        return false;
    }

    handleChange = (e) => {
        const { ProfileActions } = this.props;
        const { name, value } = e.target;

        ProfileActions.changeProfile({
            name,
            value
        });       
    }

    handlePatchChange = async() => {
        const { ProfileActions, history, changeInfo } = this.props;
        const { birth, phoneNumber, userName } = changeInfo;

        try {
            await ProfileActions.patchProfileInfo({birth, phoneNumber, userName});
            await ProfileActions.getProfileInfo();

            history.push('/profile');

            this.setError(null);

        }   catch(e) {
            console.log(e);
            this.setError('알 수 없는 에러가 발생했습니다');
        }

    }

    render() {
        const { error, profileInfo } = this.props;
        const { userId, userName, email, phoneNumber, birth, age } = profileInfo;
        const { handleChange, handlePatchChange } = this;

        return (
            <ProfileContent title = '프로필 수정'>
                <Information name = '아이디'>
                    {userId}
                </Information>
                <InputWithLabel
                    label = '이름'
                    name = 'userName'
                    placeholder = {userName}
                    //value = {userName}
                    onChange = {handleChange}
                />
                <Information name = '이메일'>
                    {email}
                </Information>
                <InputWithLabel
                    label = '휴대폰번호'
                    name = 'phoneNumber'
                    placeholder = {phoneNumber}
                    //value = {phoneNumber}
                    onChange = {handleChange}
                />
                <InputWithLabel
                    label = '생년월일'
                    name = 'birth'
                    placeholder = {birth}
                    //value = {birth}
                    onChange = {handleChange}
                />
                <Information name = '나이'>
                    {age}
                </Information>
                {
                    error && <Error>{error}</Error>
                }
                <SaveButton onClick = {handlePatchChange}>변경 내역 저장</SaveButton>
            </ProfileContent>

        )
    }
};

export default connect (
    (state) => ({
        error : state.profile.get('error'),
        logged : state.profile.get('logged'),
        profileInfo : state.profile.get('profileInfo'),
        changeInfo : state.profile.get('changeInfo')
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })
)(ProfileSet);