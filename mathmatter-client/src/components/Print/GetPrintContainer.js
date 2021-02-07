import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Title = styled.div `
    font-family : Raleway;
    letter-spacing : 1px;
`;

const List = styled(Link) `
    color : ${oc.teal[7]};
    text-decoration : none;
    font-size : 1.5rem;
`;

const GetPrintContainer = ({myPrintList}) => (

    <div> 
        <Title>문제타입 시험타입 문제수</Title>
        {
        myPrintList.map((myList) => {
        return (
            <li key = {myList._id}>
                <List to = {myList._id}>
                    {myList.typeOfPrint}    {myList.typeOfExam} {myList.numberOfQuestion}
                </List>
            </li>
        )
    })}
    </div>
);

export default GetPrintContainer;