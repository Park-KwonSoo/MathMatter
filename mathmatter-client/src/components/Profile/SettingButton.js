import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';
import { shadow } from '../../lib/styleUtils';

const LinkWrapper = styled(Link) `
    text-decoration : none;
`;

const Settingbutton = styled.div `
    font-family : Raleway;
    font-weight : 600;
    color : ${oc.teal[7]};
    border-radius : 3px;
    padding : 0.5rem 0;
    margin : 0.5rem 1rem;

    cursor : pointer;
    border : 1px solid;
    margin-top : 1rem;

    display : flex;
    align-items : center;
    justify-content : center;

    &:hover{
        background : ${oc.teal[7]};
        color : white;
        ${shadow[1]};
    }
`;

const SettingButton = ({to, children}) => (
    <LinkWrapper to = {to}>
        <Settingbutton>
            {children}
        </Settingbutton>
    </LinkWrapper>
)

export default SettingButton;