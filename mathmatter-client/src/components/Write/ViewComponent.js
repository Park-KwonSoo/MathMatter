import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper  = styled.div `
    display : flex;
    align-items : center;
    padding : 0 0;
`;

const LocationLeft  = styled.div `
    flex : 1;
`;

const LocationCenter = styled.div `
    flex : 3;
`;

const LocationRight = styled.div `
    display : flex;
    flex : 1;
`;

const Title = styled.div `
    font-family : Raleway;
    font-size : 2rem;
    font-weight : bold;

    display : flex;
    justify-content : center;
`;

const ID = styled.div `
    font-family : Raleway;
    font-size : .7rem;
    font-weight : 600;
    margin-right : 1rem;
    margin-top : 1rem;
`;

const Date = styled.div `
    font-family : Raleway;
    font-size : .7rem;
    font-weight : 600;
    margin-top : 1rem;
    margin-bottom : 0.5rem;
`;

const Line = styled.div `
    background : ${oc.teal[7]};
    border : 0.1px solid ${oc.teal[7]};
    height : 0;
`;

const Body  = styled.div `
    display : flex;
    justify-content : center;
    align-itmes : center;

    font-family : Raleway;
    font-size : 1.4rem;
    font-weight : solid;

    margin : 0rem 1rem;
    margin-top : 4rem;
    margin-bottom : 4rem;
`;

const Comment = styled.div `

`;

const ReplyPositioner = styled.div `
    display : flex;
    justify-content : center;
    align-items : center;

    margin-top : 1rem;
`;

const Reply = styled.input `
    margin-left : 1rem;
    margin-right : 1rem;

    font-family : Raleway;

`;

const ViewComponent = ({title, userId, date, body, comment, ...rest}) => (
    <div>
        <Wrapper>
            <LocationLeft/>
            <LocationCenter>
                <Title>
                    {title}
                </Title>
            </LocationCenter>
            <LocationRight/>
        </Wrapper>
        <Wrapper>
            <LocationLeft/>
            <LocationCenter/>
            <LocationRight>
                <ID>
                    {'ID : ' + userId}
                </ID>
                <Date>
                    {'Date : ' + date}
                </Date>
            </LocationRight>
        </Wrapper>
        <Line/>
        <Body>
            {body}
        </Body>
        <Line/>
        <Comment>
            {comment}
        </Comment>
        <ReplyPositioner>
            댓글 :
            <Reply {...rest}/>
            등록
        </ReplyPositioner>
    </div>
)

export default ViewComponent;