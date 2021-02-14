//프린트 메뉴로 진입하는 컨테이너
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper } from '../../components/Print';
import { Error, SelectButton } from '../../components/Base';

import queryString from 'query-string';

class PrintMenu extends Component {

    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined)
            this.setErrorProfile('세션이 만료되었습니다')
    }
    
    componentWillUnmount() {
        this.setErrorProfile(null);
        this.setErrorPrint(null);
    }

    setErrorProfile = (message) => {
        const { ProfileActions } = this.props;
        ProfileActions.setError({
            message
        });
        return false;
    }

    setErrorPrint = (message) => {
        const { PrintActions } = this.props;
        PrintActions.setError({
            message
        });
        return false;
    }

    handleGetPrintList = async() => {
        const { logged, PrintActions } = this.props;
        if(!logged)
            this.setErrorProfile('먼저 로그인을 해야합니다.')

        try {
            await PrintActions.getPrintList();

        }   catch(e) {
            console.log(e);
            this.setErrorPrint('알 수 없는 에러가 발생했습니다.');
        }

    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const { error } = this.props;
        const { handleGetPrintList, handleGoBack } = this;

        return (
            <PrintMenuWrapper title = "Print" onClick = {handleGoBack}>
                <SelectButton to = '/print/set'>문제 생성</SelectButton>
                <SelectButton to = '/print/info' onClick = {handleGetPrintList}>나의 정보</SelectButton>
                {
                    error && <Error>{error}</Error>
                }
            </PrintMenuWrapper>
        );
    }
};

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        error : state.profile.get('error'),
        myPrintList : state.print.get('myPrintList')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintMenu);