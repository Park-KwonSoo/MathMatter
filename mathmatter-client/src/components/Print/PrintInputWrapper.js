import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
    display : block;
    align-items : center;
    justify-content : center;

    & + & {
        margin-left : 2rem;
    }
`;

const PrintInputWrapper = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default PrintInputWrapper;

