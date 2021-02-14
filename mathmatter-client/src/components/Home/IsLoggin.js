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
    color : ${oc.teal[7]};
    background : white;

    border : 1px solid;
    border-radius : 3px;

    pointer : cursor;
`;

const isLoggin = ({to, onClick, children}) => (
    <LinkWrapper to = {to} onClick = {onClick}>
        <Button>{children}</Button>
    </LinkWrapper>
);

export default isLoggin;