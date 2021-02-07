//출력한 프린트 리스트들의 정보를 볼 수 있는 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, GetPrintContainer } from '../../components/Print';

class PrintInfo extends Component {
    render() {
        const { myPrintList } = this.props;

        return (
            <PrintMenuWrapper title = 'My Print List'>
                <GetPrintContainer myPrintList = {myPrintList}/>
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