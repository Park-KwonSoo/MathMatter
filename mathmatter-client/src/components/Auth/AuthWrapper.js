import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';

import { Link } from 'react-router-dom';

//화면 중앙에 위치시킴
const Positioner = styled.div`
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;

//너비, 그림자 설정
const ShadowedBox = styled.div`
    width : 500px;
    ${shadow(2)};
`;

//로고
const LogoWrapper = styled.div`
    background : ${oc.teal[7]};
    height : 4rem;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Logo = styled(Link)`
    color : white;
    font-family : Raleway;
    font-size : 2.4rem;
    letter-spacing : 5px;
    text-decoration :none;
`;

//chiledren이 들어가는 곳 = contents가 들어가는 곳
const Contents = styled.div`
    background : white;
    padding : 2rem;
    height : auto;
`;

const AuthWrapper = ({children}) => {
    return (
        <Positioner>
            <ShadowedBox>
                <LogoWrapper>
                    <Logo to='/'> MathMatter </Logo>
                </LogoWrapper>
                <Contents>
                    {children}
                </Contents>
            </ShadowedBox>
        </Positioner>
    )
};

export default AuthWrapper;