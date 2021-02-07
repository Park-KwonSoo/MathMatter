import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Button = styled(Link) `
    color : ${oc.teal[7]};
    border-radius : 3;
`;

const isLoggin = ({to, onClick, children}) => (
    <Link to = {to} onClick = {onClick}>
        {children}
    </Link>
)

export default isLoggin;