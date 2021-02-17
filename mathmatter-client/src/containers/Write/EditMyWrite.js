import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, WriteContents, WriteButton, TitleInput, BodyInput } from '../../components/Write';
import { Error } from '../../components/Base';


class EditMyWrite extends Component {
 
    componentDidMount() {

    }

    componentWillUnmount() {
        const { WriteActions} = this.props;
        WriteActions.write({
            name : 'title',
            value : ''
        });
        WriteActions.write({
            name : 'body',
            value : ''
        });

        this.setError(null);
    }

    setError = (message) => {
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

    handleEditWriting = async() => {
        try {
            const { WriteActions, writing, match, history } = this.props;
            const { title, body } = writing.toJS();
            const { postId } = match.params;

            await WriteActions.editing({
                postId,
                title,
                body
            });

            history.push('/write/view/' + postId);

        }   catch(e) {
            console.log(e);
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    }

    handleGoBack = () => {
        const { history, match } = this.props;
        history.push('/write/view/' + match.params.postId);
    }

    render() {
        const { errorProfile , errorWrite } = this.props;
        const { title, body } = this.props.viewing.toJS()
        const { handleChange, handleEditWriting, handleGoBack } = this;

        return (
            <WriteWrapper title = 'Edit My Write' onClick = {handleGoBack}>
                <WriteContents>
                    <TitleInput name = 'title'
                    placeholder = {title}
                    onChange = {handleChange}/>
                </WriteContents>
                <WriteContents>
                    <BodyInput name = 'body'
                    placeholder = {body}
                    onChange = {handleChange}/>
                </WriteContents>
                <WriteButton onClick = {handleEditWriting}>Editing!</WriteButton>
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

export default connect (
    (state) => ({
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        writing : state.write.get('writing'),
        viewing : state.write.get('viewing')
    }),
    (dispatch) => ({
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(EditMyWrite)