import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, BoardComponents } from '../../components/Write';
import { Error } from '../../components/Base';

//toDo : 페이지네이션
class ViewMyWrite extends Component {

    componentDidMount() {
        const { WriteActions } = this.props;
        WriteActions.seeMyWritingList();
    }

    componentWillUnmount() {
        
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { errorProfile, errorWrite, myWritingList } = this.props;
        const { handleGoBack } = this;

        return (
            <WriteWrapper title = 'My Write' onClick = {handleGoBack}>
                <BoardComponents boardList = {myWritingList}/>
                {
                    errorProfile && <Error>{errorProfile}</Error>
                }
                {
                    errorWrite && <Error>{errorWrite}</Error>
                }
            </WriteWrapper>
        )
    }
}

export default connect(
    (state) => ({
        logged : state.profile.get('logged'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        myWritingList : state.write.get('myWritingList')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(ViewMyWrite)