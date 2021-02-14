import React from 'react';
import styled from 'styled-components';

const Label = styled.div `
    font-family : Raleway;
    text-decoration : none;

    & + & {
        margin-top : 1rem;
    }

    margin-top : 1rem;
`;

const RangeSlide = styled.input.attrs({
    type : 'range',
    min : 1,
    max : 4,
    defaultValue : 1
})` 
    cursor : pointer;
`;

const Range = ({children, ...rest}) => (
    <Label>
        <RangeSlide {...rest}/>
        {children}
    </Label>
);

export default Range;