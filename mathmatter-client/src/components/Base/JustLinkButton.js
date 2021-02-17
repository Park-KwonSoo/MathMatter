import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Positioner = styled(Link) `
    display : flex;
    align-items : center;
    justify-content : center;

    margin-top : 0.5rem;
    
    text-decoration : none;
`;

const Button = styled.button `
    color : ${oc.teal[7]};
    background : white;

    display : flex;
    align-items : center;
    justify-content : center;

    font-family : Raleway;
    font-size : 1.2rem;
    font-weight : bold;

    border-radius : 3px;
    border : 1px solid;

    padding-top : 0.5rem;
    padding-left : 4rem;
    padding-right : 4rem;
    padding-bottom : 0.5rem;

    cursor : pointer;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
    }
`;

const JustLinkButton = ({to, onClick, children}) => (
    <Positioner to = {to}>
        <Button onClick = {onClick}>
            {children}
        </Button>
    </Positioner>
);

export default JustLinkButton;