import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

//두 개가 함께 있을 때 상단(그 사이)에 여백을 준다.
const Wrapper = styled.div `
   
`;

const Label = styled.div `
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
`;

const Input = styled.input `
    width : 100%;
    border : 1px solid ${oc.gray[3]};
    outline : none;
    border-radius : 3px;
    line-height : 2rem;
    font-size : 1rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    ::placeholder {
        color : ${oc.gray[3]}
    };
`;

const InputWithLabel = ({label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest}/>
    </Wrapper>
);

export default InputWithLabel;