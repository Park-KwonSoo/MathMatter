//내신형
import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

import * as printActions from '../../redux/modules/print';
import * as profileActions from '../../redux/modules/profile';

import { PrintMenuWrapper, PrintInputWrapper, PrintInput, SaveButton } from '../../components/Print';

import storage from '../../lib/storage';

class PrintType1 extends Component {
    
    componentDidMount () {
        const { logged } = this.props;
        if(!logged) this.setError('먼저 로그인을 해야합니다');
    }

    setError = (message) => {
        const { ProfileActions } = this.props;

        ProfileActions.setError({
            message
        });
        
        return false;
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
        const { PrintActions, profileInfo, history } = this.props;
        const { age } =  profileInfo;
        
        try {
            await PrintActions.makePrint({
                name : 'typeOfPrint',
                value : '내신형'
            });
            await PrintActions.makePrint({
                name : 'age',
                value : age
            });
    
            const { semester, typeOfExam, numberOfQuestion, difficulty, typeOfPrint } = this.props.makeInfo.toJS();

            await PrintActions.setPrint({
                type : 1,

                age,
                typeOfPrint,
                semester : Number(semester),
                typeOfExam : Number(typeOfExam),
                numberOfQuestion : Number(numberOfQuestion),
                difficulty : Number(difficulty)
            });

            await PrintActions.getPrintList();
            
            const resultId = this.props.resultPrintInfo.toJS()._id;
            
            storage.set('myPrintList', this.props.myPrintList);
            history.push('/print/result/' + resultId);

        }   catch(e) {
            this.setError('알 수 없는 에러가 발생했습니다');
        }
    }

    handleGoBack = async() => {
        const { history } = this.props;
        history.push('/print/set');
    }

    render() {
        const { handleChange, handleSetPrint, handleGoBack } = this;

        return (
            <PrintMenuWrapper title = '내신형 문제 설정' onClick = {handleGoBack}>
                <PrintInputWrapper>
                    <PrintInput name = 'semester'
                    type = 'number'
                    onChange = {handleChange}
                    >학기</PrintInput>
                    <PrintInput name = 'typeOfExam'
                    type = 'number'
                    onChange = {handleChange}
                    >시험</PrintInput>
                    <PrintInput name = 'numberOfQuestion'
                    type = 'number'
                    onChange = {handleChange}>문제수</PrintInput>
                    <PrintInput name = 'difficulty'
                    type = 'number'
                    onChange = {handleChange}>난이도</PrintInput>
                </PrintInputWrapper>
                <PrintInputWrapper>
                    <SaveButton onClick = {handleSetPrint}/>
                </PrintInputWrapper>
            </PrintMenuWrapper>
        );
    }

};

export default connect (
    (state) => ({
        logged  : state.profile.get('logged'),
        profileInfo : state.profile.get('profileInfo'),
        error : state.profile.get('error'),
        makeInfo : state.print.get('makeInfo'),
        resultPrintInfo : state.print.get('resultPrintInfo'),
        myPrintList : state.print.get('myPrintList')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        PrintActions : bindActionCreators(printActions, dispatch)
    })
)(PrintType1);