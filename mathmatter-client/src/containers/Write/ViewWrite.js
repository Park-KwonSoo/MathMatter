import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, ViewComponent, ButtonWrapper, EditAndDeleteButton} from '../../components/Write';
import { Error } from '../../components/Base';

//toDo : 이전 글 보기, 다음 글 보기 구현
class ViewWrite extends Component {

    componentDidMount() {
        const { match } = this.props;
        this.handleGetWriteDetail(match.params.postId);
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

    //현재 글을 보고 있는 유저가 글을 수정할 수 있는 권한이 있는지 검증
    validate = () => {
        const { profileInfo, viewing } = this.props;

        if(profileInfo.userId === viewing.toJS().userId)    return true;
        else return false;
    }

    handleChange = (e) => {
        const { WriteActions } = this.props;
        const body = e.target.value;

        WriteActions.reply({
            body
        });
    }

    handleReplying = async() => {
        try {
            const { WriteActions, replying, history, match } = this.props;
            const { body } = replying;
            const { postId } = match.params;

            WriteActions.replying({
                postId,
                body
            });
            
            //댓글 등록 성공 시 새로고침
            history.go(0);

        }   catch(e) {
            console.log(e);
            this.setErrorWrite('댓글을 등록할 수 없습니다.');
        }
    }

    handleDeleteWrite = async() => {
        try {
            const { WriteActions, match } = this.props;
            await WriteActions.deleteWriting(match.params.postId);

        }   catch(e) {
            console.log(e);
            this.setErrorWrite('글을 삭제할 수 없습니다.');
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write/board');
    }

    render() {
        const { logged, errorProfile, match } = this.props;
        const { title, userId, date, body, comments = []} = this.props.viewing.toJS();
        const { handleChange, handleReplying, handleDeleteWrite, handleGoBack, validate } = this;

        return (
            <WriteWrapper title = '작성글' onClick = {handleGoBack}>
                {
                    logged ? 
                    <ViewComponent 
                    title = {title} 
                    userId = {userId}
                    date = {(new Date(date)).getFullYear() + '-'
                    + ((new Date(date)).getMonth() + 1) + '-'
                    + (new Date(date)).getDate() + ' '
                    + (new Date(date)).getHours() + ':'
                    + (new Date(date)).getMinutes()}
                    body = {body}
                    comments = {comments}
                    onChange = {handleChange}
                    onClick = {handleReplying}>
                        {
                            validate() ?
                            <ButtonWrapper>
                                <EditAndDeleteButton to = {'/write/view/' + match.params.postId + '/edit'}>수정</EditAndDeleteButton>
                                <EditAndDeleteButton to = '/write/board' onClick = {handleDeleteWrite}>삭제</EditAndDeleteButton>
                            </ButtonWrapper>
                            : ''
                        }
                    </ViewComponent> : <Error>{errorProfile}</Error>
                }
            </WriteWrapper>
        )
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        profileInfo : state.profile.get('profileInfo'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        board : state.write.get('board'),
        viewing : state.write.get('viewing'),
        replying : state.write.get('replying')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(ViewWrite);