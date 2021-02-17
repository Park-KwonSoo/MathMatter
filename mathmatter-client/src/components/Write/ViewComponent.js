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
    flex : 4;
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

const DateDiv = styled.div `
    font-family : Raleway;
    font-size : .7rem;
    font-weight : 600;
    margin-top : 1rem;
    margin-bottom : 0.5rem;
    margin-right : .5rem;

    width : 100px;
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

const Comment = styled.li `
    font-family : Raleway;
    font-size : 1rem;
    font-weight : 500px;
    
    margin-top : .5rem;

    border : 1px solid transparent;
    
    padding : 0 1rem;

    & + & {
        margin-top : .2rem;
    }
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
    padding : .5rem 1rem;

    font-family : Raleway;
    font-size : 1rem;
    font-weight : 400;

    border : 1px solid ${oc.teal[7]};
    border-radius : 3px;

`;

const SaveButton = styled.button `
    background : white;
    color : ${oc.teal[7]};
    
    font-family : Raleway;
    font-size : 1.1rem;
    font-weight : 500;

    border : 1px solid;
    border-radius : 3px;

    padding : .1rem .7rem;
`;

const ViewComponent = ({title, userId, date, body, comments, onClick, children, ...rest}) => (
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
            <LocationLeft>
                {children}
            </LocationLeft>
            <LocationCenter/>
            <LocationRight>
                <ID>
                    {'ID : ' + userId}
                </ID>
                <DateDiv>
                    {'Date : ' + date}
                </DateDiv>
            </LocationRight>
        </Wrapper>
        <Line/>
        <Body>
            {body}
        </Body>
        <Line/>
        {
            comments.map((commentList) => {
                return (
                    <Comment key = {commentList._id}>
                        {commentList.userId} : {commentList.body} // 
                        {(new Date(commentList.date)).getFullYear() + '-'
                        + ((new Date(commentList.date)).getMonth() + 1) + '-'
                        + (new Date(commentList.date)).getDate() + ' '
                        + (new Date(commentList.date)).getHours() + ':'
                        + (new Date(commentList.date)).getMinutes()}
                    </Comment>
                )
            })
        }
        <ReplyPositioner>
            댓글 :
            <Reply {...rest}/>
            <SaveButton onClick = {onClick}>등록</SaveButton>
        </ReplyPositioner>
    </div>
)

export default ViewComponent;