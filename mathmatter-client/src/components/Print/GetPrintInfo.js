import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Title = styled.div `
    font-family : Raleway;
    letter-spacing : 1.5px;
    font-size : 1.5 rem;
`;

const List = styled(Link) `
    color : ${oc.teal[7]};
    text-decoration : none;
`;

const GetPrintInfo = ({myPrintList}) => (
    <div>
        <Title></Title>
        {
        myPrintList.map((myList) => {
        return (
            <li key = {myList._id}>
                <List to = {'/print/result/' + myList._id}>
                    {myList.typeOfPrint}    {myList.typeOfExam} {myList.numberOfQuestion}   {myList.createdDate}
                </List>
            </li>
        )
    })}
    </div>
);

export default GetPrintInfo;