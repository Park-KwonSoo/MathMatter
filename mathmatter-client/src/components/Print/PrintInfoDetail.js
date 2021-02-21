import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div `
    display : flex;
    justify-content : center;
`;

const LocationLeft = styled.div `
    flex : 1;
`

const LocationCenter = styled.div `
    flex : 0.5;
`;

const LocationRight = styled.div `
    flex : 1;
`;

const HalfLine = styled.div `
    border : 2px solid ${oc.teal[7]};
    height : 300px;

    margin-left : 1rem;
    margin-right : 1rem;
`;

const DetailInfo = styled.div `
    font-family : Raleway;
    letter-spacing : 2px;
    font-size : 1.2rem;
`;

const Print = ({result}) => (
    <DetailInfo>
        {result}
    </DetailInfo>
);

const PrintInfoDetail = ({result}) => (
    <Wrapper>
        <LocationLeft>
            {result.map(result => ( 
                <Print result = {result.body} key = {result.body}/>
            ))}
        </LocationLeft>
        <LocationCenter>
            <HalfLine/>
        </LocationCenter>
        <LocationRight/>
    </Wrapper>
);

export default PrintInfoDetail;