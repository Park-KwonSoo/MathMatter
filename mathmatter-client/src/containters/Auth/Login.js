import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, AlignedLink } from '../../components/Auth';
import { connect } from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import { bindActionCreators } from 'redux';

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

    render() {
        const { userId, password } = this.props.form.toJS();
        const { handleChange } = this;

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
                <AlignedLink to = '/auth/register'> Register </AlignedLink>
                <AuthButton> Login </AuthButton>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form : state.auth.getIn(['login', 'form'])
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Login);