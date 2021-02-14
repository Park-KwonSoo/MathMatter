import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Aligner = styled.div `
    margin-top : 1rem;
    text-align : right;
`;

const StyledLink = styled(Link) `
    color : ${oc.teal[6]};
    text-decoration : none;
    &:hover {
        color : ${oc.teal[9]};
    }
`;

const AlignedLink = ({to, children}) => (
    <Aligner>
        <StyledLink to = {to}>{children}</StyledLink>
    </Aligner>
);

export default AlignedLink;