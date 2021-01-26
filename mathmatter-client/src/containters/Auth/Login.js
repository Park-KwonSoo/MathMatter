import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, AlignedLink, AuthError } from '../../components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';
import * as profileActions from '../../redux/modules/profile';
import storage from '../../lib/storage';

class Login extends Component {

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login');
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;


        AuthActions.changeInput({
            name,
            value,
            form : 'login'
        });
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form : 'login',
            message
        });
        return false;
    }

    handleLocalLogin = async() => {
        const { form, AuthActions, ProfileActions, history } = this.props;
        const { userId, password } = form.toJS();

        try {
            await AuthActions.localLogin({userId, password});
            const loggedInfo = this.props.result.toJS();

            ProfileActions.setLoggedInfo();
            history.push('/');

            storage.set('loggedInfo', loggedInfo);

        }   catch(e) {
            console.log(e);
            this.setError("로그인에 실패하였습니다.");
        }


    }


    render() {
        const { error } = this.props;
        const { userId, password } = this.props.form.toJS();
        const { handleChange, handleLocalLogin } = this;

        return (
            <AuthContent title = "Login">
                <InputWithLabel 
                    label = "ID" 
                    name = "userId" 
                    placeholder = "ID"
                    value = {userId}
                    onChange = {handleChange}
                    type = "email"/>
                <InputWithLabel 
                    label = "Password" 
                    name = "password" 
                    placeholder = "Password"
                    value = {password}
                    onChange = {handleChange} 
                    type = "password"/>
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AlignedLink to = '/auth/register'> Register </AlignedLink>
                <AuthButton onClick = {handleLocalLogin}> Login </AuthButton>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form : state.auth.getIn(['login', 'form']),
        error : state.auth.getIn(['login', 'error']),
        result : state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch),
        ProfileActions : bindActionCreators(profileActions, dispatch)
    })
)(Login);