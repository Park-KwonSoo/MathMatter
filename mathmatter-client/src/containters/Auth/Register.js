import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton } from '../../components/Auth'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';

class Register extends Component {
    
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
    }

    render() {
        const { email, phoneNumber, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange } = this;


        return (
            <AuthContent title = "Register">
                <InputWithLabel 
                    label = "Phone Number"
                    name = "phoneNumber" 
                    placeholder = "Phone Number"
                    value = {phoneNumber}
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
                <AuthButton> Register to Start! </AuthButton>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form : state.auth.getIn(['register', 'form'])
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Register);