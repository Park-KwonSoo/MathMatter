//출력한 프린트 리스트들의 정보를 볼 수 있는 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from '../../redux/modules/base';
import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, GetPrintInfo, Contents } from '../../components/Print';
import { Error, Pagination } from '../../components/Base';

import storage from '../../lib/storage';

class PrintInfo extends Component {

    //to Do : 새로고침시 정보를 불러올 수 없음
    componentDidMount() {
        // const { logged } = this.props;
        // if(!logged) this.setError('먼저 로그인을 해야합니다');  
    }

    componentWillUnmount() {
        storage.set('myPrintList', this.props.myPrintList);
    }

    setError = (message) => {
        const { ProfileActions } = this.props;
        ProfileActions.setError({
            message
        });
        return false;
    }

    currentPrints = (tmp, indexOfFirst, indexOfLast) => {
        let currentPrints = 0;
        currentPrints = tmp.slice(indexOfFirst, indexOfLast);
        return currentPrints;
    }

    handlePagination = (page) => {
        const { BaseActions } = this.props;
        BaseActions.setCurrentPage(Number(page));
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/print');
    }

    render() {
        const { myPrintList, error, currentPage, postsPerPage } = this.props;
        const { currentPrints, handlePagination, handleGoBack } = this;

        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;

        return (
            <PrintMenuWrapper title = 'My Print List' onClick = {handleGoBack}>
                <Contents>
                    <GetPrintInfo myPrintList = {currentPrints(myPrintList, indexOfFirst, indexOfLast)}/>
                </Contents>
                <Contents>
                    <Pagination postsPerPage = {postsPerPage} totalPosts = {myPrintList.length} 
                    paginate = {handlePagination}/>
                </Contents>
                <Contents>
                {
                    error && <Error>{error}</Error>
                }
                </Contents>
            </PrintMenuWrapper>
        )
     
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        myPrintList : state.print.get('myPrintList'),
        error : state.profile.get('error'),
        currentPage : state.base.get('currentPage'),
        postsPerPage : state.base.get('postsPerPage')
    }),
    (dispatch) => ({
        BaseActions : bindActionCreators(baseActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintInfo);