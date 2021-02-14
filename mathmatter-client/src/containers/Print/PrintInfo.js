//출력한 프린트 리스트들의 정보를 볼 수 있는 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, GetPrintInfo } from '../../components/Print';
import { Error } from '../../components/Base';

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

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/print');
    }

    render() {
        const { myPrintList, error } = this.props;
        const { handleGoBack } = this;

        return (
            <PrintMenuWrapper title = 'My Print List' onClick = {handleGoBack}>
                <GetPrintInfo myPrintList = {myPrintList}/>
                {
                    error && <Error>{error}</Error>
                }
            </PrintMenuWrapper>
        )
     
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        myPrintList : state.print.get('myPrintList'),
        error : state.profile.get('error')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintInfo);