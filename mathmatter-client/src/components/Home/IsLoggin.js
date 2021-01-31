import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';


const isLoggin = ({onClick}) => (
    <Link to = '/profile' onClick = {onClick}>
        프로필 메뉴
    </Link>
)

export default isLoggin;