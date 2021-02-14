//출력한 프린트 리스트들의 정보를 볼 수 있는 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, GetPrintInfo } from '../../components/Print';
import storage from '../../lib/storage';

class PrintInfo extends Component {

    componentWillUnmount() {
        storage.set('myPrintList', this.props.myPrintList);
    }

    handleGoBack = async() => {
        const { history } = this.props;
        
        history.push('/print');
    }

    render() {
        const { myPrintList } = this.props;
        const {handleGoBack} = this;

        return (
            <PrintMenuWrapper title = 'My Print List' onClick = {handleGoBack}>
                <GetPrintInfo myPrintList = {myPrintList}/>
            </PrintMenuWrapper>
        )
     
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        myPrintList : state.print.get('myPrintList'),
        error : state.print.get('error')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintInfo);