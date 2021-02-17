import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, WriteContents } from '../../components/Write';
import { SelectButton, Error } from '../../components/Base';

class WriteMenu extends Component {

    componentDidMount() {

    }

    componentWillUnmount() {
        this.setErrorProfile(null);
        this.setErrorWrite(null);
    }

    setErrorProfile = (message) => {
        const { ProfileActions } = this.props;

        ProfileActions.setError({
            message
        });

        return false;
    }

    setErrorWrite = (message) => {
        const { WriteActions } = this.props;

        WriteActions.setError({
            message
        });

        return false;
    }

    handleGoBoard = async() => {
        const { logged } = this.props;
        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다.');

        try {
            const { WriteActions } = this.props;
            await WriteActions.seeBoard();

        }   catch(e) {
            console.log(e);
            this.setErrorWrite('알 수 없는 에러가 발생했습니다.');
        }
    }

    handleGetMyWrite = async() => {
        const { logged } = this.props;
        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다.');

        try {
            const { WriteActions } = this.props;
            await WriteActions.seeMyWritingList();
            
        }   catch(e) {
            console.log(e);
            this.setErrorWrite('알 수 없는 에러가 발생했습니다.');
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { errorProfile, errorWrite } = this.props;
        const { handleGoBoard, handleGetMyWrite, handleGoBack } = this;

        return (
            <WriteWrapper title = 'Write Menu' onClick = {handleGoBack}>
                <WriteContents>
                    <SelectButton to = '/write/board' onClick = {handleGoBoard}>게시판</SelectButton>
                    <SelectButton to = '/write/write'>글작성</SelectButton>
                    <SelectButton to = '/write/mywrite' onClick = {handleGetMyWrite}>내가 쓴 글</SelectButton>
                </WriteContents>
                <WriteContents>
                    {
                        errorProfile && <Error>{errorProfile}</Error>
                    }
                </WriteContents>
                <WriteContents>
                    {
                        errorWrite && <Error>{errorWrite}</Error>
                    }
                </WriteContents>
            </WriteWrapper>
        );
    }
}

export default connect(
    (state) => ({
        logged : state.profile.get('logged'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(WriteMenu);