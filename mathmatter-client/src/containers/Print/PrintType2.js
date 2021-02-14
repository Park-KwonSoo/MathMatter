//수능형
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as printActions from '../../redux/modules/print';
import * as profileActions from '../../redux/modules/profile';

import { PrintMenuWrapper, PrintInputWrapper, PrintInput, SaveButton } from '../../components/Print';
import { Error } from '../../components/Base';

import storage from '../../lib/storage';

class PrintType2 extends Component {

    componentWillUnmount() {
        const { PrintActions } = this.props;
        PrintActions.initializeMakePrint();

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
    }

    validate = {
        month : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('올바른 달을 입력해야 합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        }
    }

    handleChange = (e) => {
        const { PrintActions } = this.props;
        const { name, value } = e.target;

        PrintActions.makePrint({
            name,
            value
        });
    }

    handleSetPrint = async() => {
        const { PrintActions, logged, history } = this.props;

        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다.');

        const { month } = this.props.makeInfo.toJS();
        const { validate } = this;

        if(!validate['month'](month))   return;

        try {
            const { age } = this.props.profileInfo;

            await PrintActions.setPrint({
                type : 2,
                age,
                month : Number(month)
            });

            await PrintActions.getPrintList();

            const { _id } = this.props.resultPrintInfo.toJS();

            storage.set('myPrintList', this.props.myPrintList);
            history.push('/print/result/' + _id);

        }   catch(e) {
            this.setErrorPrint('알 수 없는 에러가 발생했습니다');
            return;
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/print/set');
    }

    render() {
        const { handleChange, handleSetPrint, handleGoBack } = this;
        const { errorProfile, errorPrint } = this.props;

        return (
            <PrintMenuWrapper title = '수능형 문제 설정' onClick = {handleGoBack}>
                <PrintInputWrapper>
                    <PrintInput name = 'month'
                    type = 'number'
                    placeholder = 'Month'
                    onChange = {handleChange}/>
                </PrintInputWrapper>
                <PrintInputWrapper>
                    <SaveButton onClick = {handleSetPrint}/>
                    {
                        errorProfile && <Error>{errorProfile}</Error>
                    }
                    {
                        errorPrint && <Error>{errorPrint}</Error>
                    }
                </PrintInputWrapper>
            </PrintMenuWrapper>
        );
    }
};

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        profileInfo : state.profile.get('profileInfo'),
        errorProfile : state.profile.get('error'),
        errorPrint : state.print.get('error'),
        makeInfo : state.print.get('makeInfo'),
        resultPrintInfo : state.print.get('resultPrintInfo'),
        myPrintList : state.print.get('myPrintList')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintType2);