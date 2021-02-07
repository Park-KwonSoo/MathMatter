import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow } from '../../lib/styleUtils';

const Positioner = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;

const ShadowedBox = styled.div `
    width : 500px;
    ${shadow[2]};
`;

const TitleWrapper  = styled.div `
    background : ${oc.teal[7]};
    height : 4rem;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Title = styled.div `
    color : white;
    font-family : Raleway;
    font-size : 2.4rem;
    letter-spacing : 5px;
    text-decoration : none;
`;

const Contents = styled.div `
    background : white;
    padding : 3rem;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const PrintMenuWrapper = ({title, children}) => (
    <Positioner>
        <ShadowedBox>
            <TitleWrapper>
                <Title>{title}</Title>
            </TitleWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default PrintMenuWrapper;