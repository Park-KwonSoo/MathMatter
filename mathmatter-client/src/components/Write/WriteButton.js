import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Positioner = styled.div `
    display : flex;
    justify-content : flex-end;

    margin-top : 2rem;
    margin-right : 3rem;
`;

const Button = styled.button `
    color : ${oc.teal[7]};
    background : transparent;
    font-size : 1rem;
    font-family : Raleway;
    font-weight : 600;
    
    border-radius : 3px;
    border : 1px solid;

    display : flex;
    justify-content : center;
    align-items : center;

    padding : .5rem 3rem;

    cursor : pointer;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
    }
`;

const WriteButton = ({onClick, children}) => (
    <Positioner>
        <Button onClick = {onClick}>{children}</Button>   
    </Positioner>
)

export default WriteButton;