import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Settingbutton = styled(Link) `
    color : ${oc.teal[7]};
`;

const SettingButton = ({to, children}) => (
    <Settingbutton to = {to}>
        {children}
    </Settingbutton>
)

export default SettingButton;