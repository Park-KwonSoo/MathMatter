import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from '../../redux/modules/base';
import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, WriteContents, BoardComponents } from '../../components/Write';
import { Error, Pagination } from '../../components/Base';

//toDo : 페이지네이션
class ViewMyWrite extends Component {

    componentDidMount() {
        const { WriteActions } = this.props;
        WriteActions.seeMyWritingList();
    }

    componentWillUnmount() {
        
    }

    currentPosts = (tmp, indexOfFirst, indexOfLast) => {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    handlePagination = (page) => {
        const { BaseActions } = this.props;
        BaseActions.setCurrentPage(Number(page));
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { errorProfile, errorWrite, myWritingList, currentPage, postsPerPage } = this.props;
        const { currentPosts, handlePagination, handleGoBack } = this;

        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;


        return (
            <WriteWrapper title = 'My Write' onClick = {handleGoBack}>
                <BoardComponents boardList = {currentPosts(myWritingList, indexOfFirst, indexOfLast)}/>
                <WriteContents>
                    <Pagination postsPerPage = {postsPerPage} totalPosts = {myWritingList.length}
                    paginate = {handlePagination}/>
                </WriteContents>
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
        myWritingList : state.write.get('myWritingList'),
        currentPage : state.base.get('currentPage'),
        postsPerPage : state.base.get('postsPerPage')
    }),
    (dispatch) => ({
        BaseActions : bindActionCreators(baseActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(ViewMyWrite)