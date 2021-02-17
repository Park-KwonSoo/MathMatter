import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const LinkWrapper = styled(Link) `
    & + & {
        margin-left : 1rem;
    }
`;

const Button = styled.button `
    color : white;
    background : ${oc.teal[7]};
    border-radius : 10px;
    padding : 0rem 1rem;
    cursor : pointer;
    border : 3px solid;

    font-family : Raleway;
    font-size : 1.2rem;
    font-weight : 400;
    
    letter-spacing : 3px;
    text-decoration : none;

    height : 10rem;
    width : 140px;

    &:hover {
        background : ${oc.teal[5]};
    }
`;

const SelectButton = ({to, onClick, children}) => (
    <LinkWrapper to = {to} onClick = {onClick}>
        <Button>
            {children}
        </Button>
    </LinkWrapper>
);

export default SelectButton;