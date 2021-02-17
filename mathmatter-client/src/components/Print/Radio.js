import React from 'react';
import styled from 'styled-components';

const Label = styled.label `
    font-family : Raleway;
    text-decoration : none;

    & + & {
        margin-left : 2rem;
    }
`;

const RadioButton = styled.input.attrs({
    type : 'radio'
}) `
    cursor : pointer;
`;

const Radio = ({children, ...rest}) => (
    <Label>
        <RadioButton {...rest}/>
        {children}
    </Label>
);

export default Radio;