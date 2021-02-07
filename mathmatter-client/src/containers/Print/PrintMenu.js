//프린트 메뉴로 진입하는 컨테이너
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, SelectButton } from '../../components/Print';

import queryString from 'query-string';
import storage from '../../lib/storage';

class PrintMenu extends Component {

    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined)
            this.setError('세션이 만료되었습니다')
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

    setErrorPrint = (message) => {
        const { PrintActions } = this.props;
        PrintActions.setError({
            message
        });
        return false;
    }

    handleGetPrintList = async() => {
        const { logged } = this.props;
        if(!logged)
            this.setErrorProfile('먼저 로그인을 해야합니다.')
        

        try {
            const { PrintActions, myPrintList } = this.props;
            await PrintActions.getPrintList();

            storage.set('myPrintList', myPrintList);

        }   catch(e) {
            console.log(e);
            this.setErrorPrint('알 수 없는 에러가 발생했습니다.');
        }

    }

    render() {
        const { handleGetPrintList } = this;

        return (
            <PrintMenuWrapper title = "Menu">
                <SelectButton to = '/print/set'>문제 생성</SelectButton>
                <SelectButton to = '/print/info' onClick = {handleGetPrintList}>나의 정보</SelectButton>
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