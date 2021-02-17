import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper  = styled.div `
    & + & {
        margin-top : 0.5rem;
        margin-bottom : 0.5rem;
    }
`;

const Input = styled.input `
    font-family : Raleway;
    font-size : 1rem;
    
    border : 1px solid ${oc.gray[5]};
    border-radius : 3px;

    outline : none;

    width : 70%;
    padding : 0.5rem 1rem;

    ::placeholder {
        color : ${oc.gray[4]};
    }
`;

const PrintInput = ({children, ...rest}) => (
    <Wrapper>
        <Input {...rest}/>
    </Wrapper>
);

export default PrintInput;