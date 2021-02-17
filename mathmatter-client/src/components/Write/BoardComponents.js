import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { Link } from 'react-router-dom';

const Li = styled.li `
    padding-left : 2rem;
    padding-right : 1rem;
`;

const List = styled(Link) `
    color : ${oc.teal[7]};
    text-decoration : none;
`;

const BoardComponents = ({boardList}) => (
    <div>
        {
        boardList.map((board) => {
            return (
                <Li key = {board.postId}>
                    <List to = {'/write/view/' + board.postId}>
                        {board.postId} // {board.title} // {board.userId} // {board.date}
                    </List>
                </Li>
            )
        })
        }
    </div>
);

export default BoardComponents;