//내신형
import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

import * as printActions from '../../redux/modules/print';
import * as profileActions from '../../redux/modules/profile';

import { PrintMenuWrapper, PrintInputWrapper, PrintInput, SaveButton } from '../../components/Print';
import { Error } from '../../components/Base';

import storage from '../../lib/storage';

class PrintType1 extends Component {

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
        semester : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('학기를 입력해야 합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        },
        typeOfExam : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('중간고사, 혹은 기말고사인지 입력해야합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        },
        numberOfQuestion : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('문제 수를 입력해야합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        },
        difficulty : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('올바른 난이도를 입력해야 합니다.');
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

        if(!logged) this.setErrorProfile('먼저 로그인을 해야합니다');
        
        const { semester, typeOfExam, numberOfQuestion, difficulty } = this.props.makeInfo.toJS();
        const { validate } = this;

        if(!validate['semester'](semester)
        || !validate['typeOfExam'](typeOfExam)
        || !validate['numberOfQuestion'](numberOfQuestion)
        || !validate['difficulty'](difficulty)) return;
      
        try {  
            const { age } =  this.props.profileInfo;

            await PrintActions.setPrint({
                type : 1,
                age,
                semester : Number(semester),
                typeOfExam : Number(typeOfExam),
                numberOfQuestion : Number(numberOfQuestion),
                difficulty : Number(difficulty)
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
            <PrintMenuWrapper title = '내신형 문제 설정' onClick = {handleGoBack}>
                <PrintInputWrapper>
                    <PrintInput name = 'semester'
                    type = 'number'
                    onChange = {handleChange}
                    placeholder = '학기'/>
                    <PrintInput name = 'typeOfExam'
                    type = 'number'
                    onChange = {handleChange}
                    placeholder = '시험 유형'/>
                    <PrintInput name = 'numberOfQuestion'
                    type = 'number'
                    onChange = {handleChange}
                    placeholder = '문제 수'/>
                    <PrintInput name = 'difficulty'
                    type = 'number'
                    onChange = {handleChange}
                    placeholder = '난이도'/>
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
        logged  : state.profile.get('logged'),
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
)(PrintType1);