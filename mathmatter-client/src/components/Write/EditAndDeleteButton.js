import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const LinkWrapper = styled(Link) `
    text-decoration : none;
    & + & {
        margin-left : .7rem;
    }
`;

const Button = styled.button `  
    background : white;
    color : ${oc.teal[7]};
    width : 45px;

    font-family : Raleway;
    font-size : .7rem;
    font-weight : 600;

    border : 1px solid;
    border-radius : 3px;

    padding : 0.4rem .5rem;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
    }
`;

const EditAndDeleteButton = ({to, onClick, children}) => (
    <LinkWrapper to = {to}>
        <Button onClick = {onClick}>{children}</Button>
    </LinkWrapper>
)

export default EditAndDeleteButton;