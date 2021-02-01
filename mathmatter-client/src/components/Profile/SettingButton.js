import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Settingbutton = styled(Link) `
    font-family : Raleway;
    font-weight : 60;
    color : ${oc.teal[7]};
    border-radius : 3px;
    padding : 0.5rem 0;
    margin : 0.5rem 1rem;
    text-decoration : none;
    cursor : pointer;
    border : 1px solid;
    margin-top : 1rem;
`;

const SettingButton = ({to, children}) => (
    <Settingbutton to = {to}>
        {children}
    </Settingbutton>
)

export default SettingButton;