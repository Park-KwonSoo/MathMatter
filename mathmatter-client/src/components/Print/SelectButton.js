import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow } from '../../lib/styleUtils';

import { Link } from 'react-router-dom';

const LinkWrapper = styled(Link) `
    & + & {
        margin-left : 1rem;
    }
`;

const Button = styled.button `
    color : white;
    background : ${oc.teal[7]};
    border-radius : 3px;
    padding : 0rem 1rem;
    cursor : pointer;
    border : 3px solid;

    font-family : Raleway;
    font-size : 1.5rem;
    letter-spacing : 5px;
    text-decoration : none;

    height : 10rem;
    ${shadow[2]};

    &:hover{
        background : ${oc.teal[5]};
        color : white;
        ${shadow[1]};
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