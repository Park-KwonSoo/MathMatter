import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../../../lib/styleUtils';

const BorderedButton = styled(Link)`
    font-family : Raleway;
    font-weight : 60;
    color : ${oc.cyan[6]};
    border : 1px solid ${oc.cyan[6]};
    padding : 0.5rem;
    padding-bottom : 0.4rem;
    cursor : pointer;
    border-radius : 2px;
    text-decoration : none;
    transition : .2s all;

    &:hover{
        background : ${oc.cyan[6]};
        color : white;
        ${shadow[1]};
    }

    &:active{
        transform: translateY(3px);
    }
`;


const LoginButton = () => {
    return (
        <BorderedButton to = '/auth/login'>Login</BorderedButton>
    );
};

export default LoginButton;