import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Li = styled.li `
    padding-left : 2rem;
    padding-right : 1rem;
`;

const List = styled(Link) `
    color : black;
    text-decoration : none;
`;

const BoardComponents = ({boardList}) => (
    <div>
        {
        boardList.map((board) => {
            return (
                <Li key = {board.postId}>
                    <List to = {'/write/view/' + board.postId}>
                        {board.postId} // {board.title} // {board.userId} //
                        {(new Date(board.date)).getFullYear() + '-'
                        + ((new Date(board.date)).getMonth() + 1) + '-'
                        + (new Date(board.date)).getDate() + ' '
                        + (new Date(board.date)).getHours() + ':'
                        + (new Date(board.date)).getMinutes()}
                    </List>
                </Li>
            )
        })
        }
    </div>
);

export default BoardComponents;