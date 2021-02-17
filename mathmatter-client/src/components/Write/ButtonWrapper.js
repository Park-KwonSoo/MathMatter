import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div `
    display : flex;
    margin-top : .5rem;
    margin-left : 1rem;
`;

const ButtonWrapper = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
)

export default ButtonWrapper;