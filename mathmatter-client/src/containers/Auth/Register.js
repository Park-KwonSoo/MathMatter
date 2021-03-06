import React, { Component } from 'react';
import { AuthContent, AuthButton, AlignedLink } from '../../components/Auth'
import { Error, InputWithLabel } from '../../components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';
//문자열 검증 라이브러리
import { isEmail, isLength, isAlphanumeric } from 'validator'

class Register extends Component {
    
    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form : 'register',
            message
        });
    }

    validate = {
        email : (value) => {
            if(!isEmail(value)) {
                this.setError("올바른 이메일 주소를 입력해주세요.");
                return false;
            }
            this.setError(null);
            return true;
        },
        userId : (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min : 5, max : 15 })) {
                this.setError("아이디는 5~15 글자의 알파벳 혹은 숫자로 이루어져야 합니다.");
                return false;
            }
            this.setError(null);
            return true;
        },
        password : (value) => {
            if(!isLength(value, { min : 8 })) {
                this.setError("비밀번호를 8자 이상 입력하세요.");
                return false;
            }
            this.setError(null);
            return true;
        },
        passwordConfirm : (value) => {
            if(this.props.form.get('password') !== value) {
                this.setError("비밀번호가 일치하지 않습니다.");
                return false;
            }
            this.setError(null);
            return true;
        }
    }

    checkEmailExists = async(email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if(this.props.exists.get('email')) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    checkUserIdExists = async(userId) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUserIdExists(userId);
            if(this.props.exists.get('userId')) {
                this.setError('이미 존재하는 ID 입니다.');
            } else {
                this.setError(null);
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleLocalRegister = async() => {
        const { form, AuthActions, error, history } = this.props;
        const { userId, email, password, passwordConfirm } = form.toJS();

        const { validate } = this;

        //에러 있으면 리턴
        if(error)   return;
        
        //검증 실패하면 리턴
        if(!validate['email'](email)
            || !validate['userId'](userId)
            || !validate['password'](password)
            || !validate['passwordConfirm'](passwordConfirm))
            return;

        try {
            await AuthActions.localRegister({
                userId, email, password
            });

            history.push('/');

        }   catch(e) {
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? "이미 존재하는 이메일입니다." : "이미 존재하는 ID입니다.";
                return this.setError(message);
            }

            return this.setError("알 수 없는 에러가 발생했습니다.");
        }

    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register');
    }
    
    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form : 'register'
        });

        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return;    //검증 실패하면 종료

        //이미 가입 된 이메일 혹은 휴대폰 번호 확인
        //name = 이메일이면 이메일 검증, 아니면 휴대폰 번호 검증
        const check = name === 'email' ? this.checkEmailExists : this.checkUserIdExists;
        check(value);
    }

    render() {
        const { error } = this.props;
        const { email, userId, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange, handleLocalRegister } = this;


        return (
            <AuthContent title = "Register">
                <InputWithLabel 
                    label = "ID"
                    name = "userId" 
                    placeholder = "ID"
                    value = {userId}
                    onChange = {handleChange}
                    />
                <InputWithLabel 
                    label = "Email" 
                    name = "email" 
                    placeholder = "Email" 
                    type = "email"
                    value = {email}
                    onChange = {handleChange}
                    />
                <InputWithLabel 
                    label = "Password" 
                    name = "password" 
                    placeholder = "Password" 
                    type = "password"
                    value = {password}
                    onChange = {handleChange}
                    />
                <InputWithLabel 
                    label = "Password Confirm" 
                    name = "passwordConfirm" 
                    placeholder = "Password Confirm" 
                    type = "password"
                    value = {passwordConfirm}
                    onChange = {handleChange}
                    />
                {
                    error && <Error>{error}</Error>
                }
                <AuthButton onClick = {handleLocalRegister}> Register to Start! </AuthButton>
                <AlignedLink to = "/auth/login"> Go back to Login </AlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form : state.auth.getIn(['register', 'form']),
        error : state.auth.getIn(['register', 'error']),
        exists : state.auth.getIn(['register', 'exists']),
        result : state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Register);