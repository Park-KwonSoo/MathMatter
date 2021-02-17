import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, WriteContents, TitleInput, BodyInput, WriteButton } from '../../components/Write';
import { Error } from '../../components/Base';

class Writing extends Component {

    componentDidMount() {

    }
    
    componentWillUnmount() {
        const { WriteActions } = this.props;
        WriteActions.write({
            name : 'title',
            value : ''
        });
        
        WriteActions.write({
            name : 'body',
            value : ''
        });

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

    handleChange = (e) => {
        const { WriteActions } = this.props;
        const { name, value } = e.target;
        
        WriteActions.write({
            name,
            value
        });
    }

    handleWriting = async() => {
        const { logged } = this.props;
        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다.');

        try {
            const { WriteActions, history } = this.props;
            const { title, body } = this.props.writing.toJS();
            
            await WriteActions.writing({
                title,
                body
            });

            history.push('/write/board');
        
        }   catch(e) {
            console.log(e);
            this.setErrorWrite('알 수 없는 에러가 발생했습니다.');
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { errorProfile, errorWrite } = this.props;
        const { handleChange, handleWriting, handleGoBack } = this;

        return (
            <WriteWrapper title = 'Writing Page' onClick = {handleGoBack}>
                <WriteContents>
                    <TitleInput name = 'title'
                    placeholder = 'Title'
                    onChange = {handleChange}/>
                </WriteContents>
                <WriteContents>
                    <BodyInput name = 'body'
                    placeholder = 'Body'
                    onChange = {handleChange}/>
                </WriteContents>
                <WriteButton onClick = {handleWriting}>Submit!</WriteButton>
                {
                    errorProfile && <Error>{errorProfile}</Error>
                }
                {
                    errorWrite && <Error>{errorWrite}</Error>
                }
            </WriteWrapper>
        )
    }
}

export default connect(
    (state) => ({
        logged : state.profile.get('logged'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        writing : state.write.get('writing')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(Writing)