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

const LocationLeft = styled.div `
    flex : 1;
`;

const LocationCenter = styled.div `
    flex : 3;
`;

const LocationRight = styled.div `
    flex : 1;
`;

const Title = styled.div `
    color : white;
    font-size : 1.7rem;
    font-family : Raleway;
   
    letter-spacing : 5px;
    text-decoration : none;

    display : flex;
    justify-content : center;
    align-items : center;
`;

const BackButton = styled.button `
    font-family : Raleway;
    text-decoration : none;
    cursor : pointer;
    background : white;
    color : ${oc.teal[7]};

    border-radius : 3px;
    border : 1.5px solid;
    height : 2.5rem;
    padding : 0 1.5rem;

    display : flex;
    justify-content : center;
    align-items : center;
    margin-left : 1rem;

    &:hover {
        background : ${oc.teal[7]};
        color : white;
        ${shadow[1]};
    }
`;

const Content = styled.div `
    padding : 3rem 0rem;
    background : white;
`;

const WriteWrapper = ({title, onClick, children}) => (
    <Positioner>
        <ShadowedBox>
            <TitleWrapper>
                <LocationLeft>
                    <BackButton onClick = {onClick}>
                        Back
                    </BackButton>
                </LocationLeft>
                <LocationCenter>
                    <Title>
                        {title}
                    </Title>
                </LocationCenter>
                <LocationRight/>
            </TitleWrapper>
            <Content>
                {children}
            </Content>
        </ShadowedBox>
    </Positioner>
);

export default WriteWrapper;