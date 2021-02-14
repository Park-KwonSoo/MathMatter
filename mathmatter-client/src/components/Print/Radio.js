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

const RadioButton = styled.input `
    
`;

const Radio = ({children, ...rest}) => (
    <Label>
        <RadioButton type = 'radio' {...rest}/>
        {children}
    </Label>
);

export default Radio;