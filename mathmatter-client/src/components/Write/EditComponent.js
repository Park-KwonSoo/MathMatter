import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div `

`;

const TitleEdit = styled.input `

`;

const BodyEdit = styled.textarea `

`;

const SaveButton = styled.button `

`;

const EditComponent = ({children}) => (
    <Wrapper>
        <TitleEdit></TitleEdit>
        <BodyEdit></BodyEdit>
        <SaveButton>자징</SaveButton>
    </Wrapper>
);

export default EditComponent;