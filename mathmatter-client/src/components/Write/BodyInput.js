import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Input = styled.textarea.attrs({
    resize : 'none'
}) `
    font-family : Raleway;
    font-size : 1rem;
    font-weight : 600;

    height : 200px;
    width : 300px;

    padding : 1rem 1rem;

    border-radius : 3px;
    border : 1px solid ${oc.teal[7]};

    ::placeholder {
        color : ${oc.gray[3]};
        font-size : 1rem;
    }
`;

const BodyInput = ({...rest}) => (
    <Input {...rest}/>
)

export default BodyInput;