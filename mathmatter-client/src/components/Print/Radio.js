import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Label = styled.label `
    font-family : Raleway;
    text-decoration : none;

    & + & {
        margin-left : 1rem;
    }
`;

const RadioButton = styled.input.attrs({
    type : 'radio'
}) `
`;

const Radio = ({children, ...rest}) => (
    <Label>
        <RadioButton {...rest}/>
        {children}
    </Label>
);

export default Radio;