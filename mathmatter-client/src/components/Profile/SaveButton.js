import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Positioner = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Savebutton = styled.button `
    color : ${oc.teal[7]};
    background : white;
    border-radius : 3px;

    border : 1px solid;
    cursor : pointer;

    font-family : Raleway;
    font-size : 1.2rem;
    font-weight : 400;

    padding-top : 0.5rem;
    padding-left : 4rem;
    padding-right : 4rem;
    padding-bottom : 0.5rem;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
    }
`;

const SaveButton = ({onClick, children}) => (
    <Positioner>
        <Savebutton onClick = {onClick}>
            {children}
        </Savebutton>
    </Positioner>
);

export default SaveButton;