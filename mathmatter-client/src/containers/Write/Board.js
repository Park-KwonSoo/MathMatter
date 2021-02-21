import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from '../../redux/modules/base';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, WriteContents, BoardComponents } from '../../components/Write';
import { Error, Pagination } from '../../components/Base';

//toDO : 페이지네이션
class Board extends Component {

    componentDidMount() {
        const { WriteActions } = this.props;
        WriteActions.seeBoard();
    }

    componentWillUnmount() {
        const { WriteActions, BaseActions } = this.props;
        WriteActions.initializeWritingForm();
        BaseActions.setCurrentPage(1);
    }

    setError = (message) => {
        const { WriteActions } = this.props;

        WriteActions.setError({
            message
        });

        return false;
    }

    currentPosts = (tmp, indexOfFirst, indexOfLast) => {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    handlePagination = (page) => {
        const { BaseActions } = this.props;
        BaseActions.setCurrentPage(Number(page));
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { error, board, currentPage, postsPerPage } = this.props;
        const { currentPosts, handlePagination, handleGoBack } = this;

        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;

        return (
            <WriteWrapper title = 'Board' onClick = {handleGoBack}>
                <BoardComponents boardList = {currentPosts(board, indexOfFirst, indexOfLast)}/>
                <WriteContents>
                    <Pagination postsPerPage = {postsPerPage} totalPosts = {board.length} paginate = {handlePagination}/>
                </WriteContents>
                {
                    error && <Error>{error}</Error>
                }
            </WriteWrapper>
        );
    }
}

export default connect (
    (state) => ({
        error : state.write.get('error'),
        board : state.write.get('board'),
        currentPage : state.base.get('currentPage'),
        postsPerPage : state.base.get('postsPerPage')
    }),
    (dispatch) => ({
        BaseActions : bindActionCreators(baseActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(Board);
