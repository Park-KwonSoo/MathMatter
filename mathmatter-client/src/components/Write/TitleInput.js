import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Input = styled.input `
    display : flex;
    justify-content : center;
    align-items : center;

    font-family : Raleway;
    font-weight : bold;
    font-size : 1.5rem;

    margin-bottom : 1rem;
    padding : .5rem 1rem;

    border : 1px solid ${oc.teal[7]};
    border-radius : 3px;

    ::placeholder {
        color : ${oc.gray[3]};
    }
`;

const TitleInput = ({...rest}) => (
    <Input {...rest}/>
)

export default TitleInput;