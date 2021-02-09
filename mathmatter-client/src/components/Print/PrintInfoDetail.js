import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const DetailInfo = styled.div `
    font-family : Raleway;
    letter-spacing : 2px;
    font-size : 1.2rem;
`;

const Print = ({result}) => (
    <DetailInfo>
        {result}
    </DetailInfo>
)

const PrintInfoDetail = ({result}) => (
    <div>
        {result.map(result => ( 
            <Print result = {result.body} key = {result.body}/>
        ))}
    </div>
);

export default PrintInfoDetail;