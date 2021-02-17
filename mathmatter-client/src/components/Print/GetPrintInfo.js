import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Title = styled.div `
    font-family : Raleway;
    letter-spacing : 1.5px;
    font-size : 1.5rem;
`;

const Li = styled.li `
`;

const List = styled(Link) `
    color : black;
    text-decoration : none;
`;

const GetPrintInfo = ({myPrintList}) => (
    <div>
        <Title></Title>
        {
        myPrintList.map((myList) => {
        return (
            <Li key = {myList._id}>
                <List to = {'/print/result/' + myList._id}>
                    {myList.typeOfPrint} // {myList.typeOfExam} // {myList.numberOfQuestion} // 
                    { 
                        (new Date(myList.createdDate)).getFullYear() + '-' +
                        ((new Date(myList.createdDate)).getMonth() + 1) + '-' + 
                        (new Date(myList.createdDate)).getDate() + ' ' + 
                        (new Date(myList.createdDate)).getHours() + `:` +
                        (new Date(myList.createdDate)).getMinutes()
                    }
                </List>
            </Li>
        )
    })}
    </div>
);

export default GetPrintInfo;