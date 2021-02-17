import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div `
    font-family : Raleway;
    font-size : 1.5rem;
    font-weight : bold;
    
    color : ${oc.teal[7]};
    text-decoration : none;
`;

const NotLoggin = () => (
    <Wrapper>
        You need to Login, First.
    </Wrapper>
)

export default NotLoggin;