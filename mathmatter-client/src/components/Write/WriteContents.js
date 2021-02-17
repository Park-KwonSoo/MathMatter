import React from 'react';
import styled from 'styled-components';

const Contents = styled.div `
    display : flex;
    align-itmes : space-around;
    justify-content : space-around;
    padding : 0 3rem;

    & + & {
        margin-top : 0.2rem;
    }
`;

const WriteContents = ({children}) => (
    <Contents>
        {children}
    </Contents>
)

export default WriteContents;