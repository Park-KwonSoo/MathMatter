import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const PageUl = styled.ul `
    margin-top : 1.5rem;

    list-style : none;
    text-align : center;
    border-radius : 3px;
    color : ${oc.teal[7]};

    padding : 1px;
    border-top : 1px solid;
    border-bottom : 1px solid;
    background : white;
`;

const PageLi = styled.li `
    display : inline-block;
    font-family : Raleway;
    font-weight : 600;
    padding : 5px;
    border-radius : 3px;

    &:hover {
        cursor : pointer;
        color : white;
        background : ${oc.teal[7]};
    }

    &:focus::after {
        color : white;
        background : ${oc.teal[7]};
    }
`;

const PageSpan = styled.span `
    &:hover::after,
    &:focus::after {
        border-radius : 100%,
        color : white;
        background : ${oc.teal[7]}
    }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
        pageNumbers.push(i);

    return (
        <PageUl>
            {
                pageNumbers.map((number) => {
                    return (
                        <PageLi key = {number}>
                            <PageSpan onClick = {() => paginate(number)}>
                                {number}
                            </PageSpan>
                        </PageLi>
                    )
                })
            }
        </PageUl>
    ) 
}

export default Pagination;