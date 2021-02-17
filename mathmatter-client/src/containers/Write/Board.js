import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as writeActions from '../../redux/modules/write';

import { WriteWrapper, BoardComponents } from '../../components/Write';
import { Error } from '../../components/Base';

//toDO : 페이지네이션
class Board extends Component {

    componentDidMount() {
        const { WriteActions} = this.props;
        WriteActions.seeBoard();
    }

    componentWillUnmount() {
        const { WriteActions } = this.props;
        WriteActions.initializeWritingForm();
    }

    setError = (message) => {
        const { WriteActions } = this.props;

        WriteActions.setError({
            message
        });

        return false;
    }


    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { error, board } = this.props;
        const { handleGoBack } = this;

        return (
            <WriteWrapper title = 'Board' onClick = {handleGoBack}>
                <BoardComponents boardList = {board}/>
                {
                    error && <Error>{error}</Error>
                }
            </WriteWrapper>
        );
    }
}

export default connect (
    (state) => ({
        error : state.write.get('error'),
        board : state.write.get('board')
    }),
    (dispatch) => ({
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(Board);
