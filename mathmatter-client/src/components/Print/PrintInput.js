import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper  = styled.div `
    & + & {
        margin-top : 0.5rem;
    }
`;

const Label = styled.div `
    font-family : Raleway;
    font-size : 1rem;
    font-weight : 500px;

`;

const Input = styled.input `
    display : auto;
`;

const PrintInput = ({children, ...rest}) => (
    <Wrapper>
        <Label>{children}</Label>
        <Input {...rest}/>
    </Wrapper>
);

export default PrintInput;