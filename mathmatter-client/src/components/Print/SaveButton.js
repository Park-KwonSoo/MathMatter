import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';

const Button = styled.button `
    color : ${oc.teal[7]};
    background : white;
    font-family : Raleway;
    font-weight : 600;

    border-radius : 3px;

    cursor : pointer;
    padding-left : 3rem;
    padding-right : 3rem;
    
    border : 1px solid;

    height : 2.25rem;
    font-size : 1.2rem;

    display : flex;
    align-items : center;
    justify-content : center;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
        ${shadow[1]}
    }
`;

const SaveButton = ({onClick}) => (
    <Button onClick = {onClick}>생성</Button>
);

export default SaveButton;