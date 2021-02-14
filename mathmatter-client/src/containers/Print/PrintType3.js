//유형별
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as printActions from '../../redux/modules/print';

import { PrintMenuWrapper, PrintInputWrapper, PrintInput, SaveButton, Radio } from '../../components/Print';
import { Error } from '../../components/Base';

import storage from '../../lib/storage';

class PrintType3 extends Component {

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
        numberOfQuestion : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('문제 수를 입력해야 합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        },
        questionType : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('문제 타입을 정확하게 입력해야 합니다.');
                return false;
            }
            this.setErrorPrint(null);
            return true;
        },
        difficulty : (value) => {
            if(isNaN(value)) {
                this.setErrorPrint('난이도를 정확하게 입력해야 합니다.');
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

        const { numberOfQuestion, questionType, difficulty } = this.props.makeInfo.toJS();
        let { includeMore } = this.props.makeInfo.toJS();
        const { validate } = this;

        if(!validate['numberOfQuestion'](numberOfQuestion)
        || !validate['questionType'](questionType)
        || !validate['difficulty'](difficulty)) return;

        try {
            if(includeMore === 'true')  includeMore = true;
            else    includeMore = false;
    
            await PrintActions.setPrint({
                type : 3,
                numberOfQuestion : Number(numberOfQuestion),
                questionType : Number(questionType),
                difficulty : Number(difficulty),
                includeMore
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
        const { errorProfile, errorPrint } = this.props;
        const { handleChange, handleSetPrint, handleGoBack } = this;

        return (
            <PrintMenuWrapper title = '유형별 문제 설정' onClick = {handleGoBack}>
                <PrintInputWrapper>
                    <PrintInput name = 'numberOfQuestion'
                    type = 'number'
                    placeholder = '문제 수'
                    onChange = {handleChange}/>
                    <PrintInput name = 'questionType'
                    type = 'number'
                    placeholder = '문제 유형'
                    onChange = {handleChange}/>
                    <PrintInput name = 'difficulty'
                    type = 'number'
                    placeholder = '난이도'
                    onChange = {handleChange}/>
                    <Radio name = 'includeMore'
                    value = {true}
                    onChange = {handleChange}>포함</Radio>
                    <Radio name = 'includeMore'
                    value = {false}
                    onChange = {handleChange}>미포함</Radio>
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
)(PrintType3);