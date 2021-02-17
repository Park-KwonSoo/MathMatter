import React from 'react';
import styled from 'styled-components';

const Content = styled.div `
    display : flex;
    align-items : space-around;
    justify-content : space-around;
    
    & + & {
        margin-top : 0.2rem;
    }
`;

const Contents = ({children}) => (
    <Content>
        {children}
    </Content>
);

export default Contents;