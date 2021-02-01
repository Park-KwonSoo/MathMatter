import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Wrapper = styled.div `
    & + & {
        margin-top : 1rem;
    }
`;

const InfoName = styled.div `
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
`;

const Info = styled.div `
    font-size : 1rem;
    color : ${oc.black[9]};
    margin-bottom : 0.25rem;
`;

const Information = ({name, children}) => (
    <Wrapper>
        <InfoName>{name}</InfoName>
        <Info>{children}</Info>
    </Wrapper>
);

export default Information;
