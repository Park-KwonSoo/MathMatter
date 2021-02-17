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

const TitleWrapper = styled.div `
    background : ${oc.teal[7]};
    height : 4rem;
    display : flex;
    align-items : center;
`;

const LocationCenter = styled.div `
    flex : 3;
`;

const LocationLeft = styled.div `
    flex : 1;
`;

const LocationRight = styled.div `
    flex : 1;
`;

const BackButton = styled.button `
    background : white;
    color : ${oc.teal[7]};
    text-decoration : none;
    font-family :Raleway;
    cursor : pointer;
    
    border : 1.5px solid;
    border-radius : 3px;

    margin-left : 1rem;
    height : 2.5rem;
    padding : 0rem 1.5rem;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
        ${shadow[1]};
    }
`;

const Title = styled.div `
    color : white;
    font-family : Raleway;
    font-size : 1.7rem;

    letter-spacing : 5px;
    text-decoration : none;
    display : flex;
    justify-content : center;
`;

const Contents = styled.div `
    background : white;
    padding : 3rem;
`;

const PrintMenuWrapper = ({title, children, onClick}) => (
    <Positioner>
        <ShadowedBox>
            <TitleWrapper>
                <LocationLeft>
                    <BackButton onClick = {onClick}>Back</BackButton>
                </LocationLeft>
                <LocationCenter>
                    <Title>{title}</Title>
                </LocationCenter>
                <LocationRight/>
            </TitleWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default PrintMenuWrapper;