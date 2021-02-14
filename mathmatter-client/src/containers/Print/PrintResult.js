//출력한 프린트의 결과를 볼 수 있는 컨테이너
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, PrintInfoDetail } from '../../components/Print';

import { Error } from '../../components/Base';

class PrintResult extends Component {

    //to Do : 새로고침시 정보를 불러올 수 없음
    componentDidMount() {
        const { match } = this.props;
        this.handleGetPrintDetail(match.params.printId);
    }

    componentWillUnmount() {
        this.setError(null);
    }

    setError = (message) => {
        const { PrintActions } = this.props;
        PrintActions.setError({
            message
        });
        return false;
    }

    handleGetPrintDetail = async(printId) => {
        try {
            const { PrintActions } = this.props;

            await PrintActions.getPrintDetail(printId);
            
        }   catch(e) {
            console.log(e);
            this.setError('알 수 없는 에러가 발생했습니다');
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/print/info');
    }

    render() {
        const { error } = this.props; 
        const { questionList = [{ body : "" }] } = this.props.resultPrintInfo.toJS();
        const { handleGoBack } = this;    

        return(
            <PrintMenuWrapper title = "Print Information" onClick = {handleGoBack}>
                <PrintInfoDetail result = {questionList}/>
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
        error : state.print.get('error'),
        resultPrintInfo : state.print.get('resultPrintInfo')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintResult);