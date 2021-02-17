import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, ViewComponent } from '../../components/Write';
import { Error } from '../../components/Base';

//toDo : 이전 글 보기, 다음 글 보기 구현
class ViewWrite extends Component {

    componentDidMount() {
        const { match } = this.props;
        this.handleGetWriteDetail(match.params.postId);
    }

    componentWillUnmount() {
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

    handleGetWriteDetail = async(postId) => {
        const { logged } = this.props;
        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다.');

        try {
            const { WriteActions } = this.props;
            await WriteActions.seeWriting(postId);

        }   catch(e) {
            console.log(e);
            this.setErrorWrite('알 수 없는 에러가 발생했습니다.');
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write/board');
    }

    render() {
        const { logged, errorProfile } = this.props;
        const { title, userId, date, body, comment } = this.props.viewing.toJS();
        const { handleGoBack } = this;

        return (
            <WriteWrapper title = '작성글' onClick = {handleGoBack}>
                {
                    logged ? 
                    <ViewComponent 
                    title = {title} 
                    userId = {userId}
                    date = {date}
                    body = {body}
                    comment = {comment}/> : <Error>{errorProfile}</Error>
                }
            </WriteWrapper>
        )
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        board : state.write.get('board'),
        viewing : state.write.get('viewing')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(ViewWrite);