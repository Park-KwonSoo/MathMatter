import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const Savebutton = styled.div `
    color : ${oc.teal[7]};
`;

const SaveButton = ({onClick, children}) => (
    <Savebutton onClick = {onClick}>
        {children}
    </Savebutton>
)

export default SaveButton;