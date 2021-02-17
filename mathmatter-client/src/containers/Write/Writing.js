import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';
import * as writeActions from '../../redux/modules/write';

import { WriteWrapper } from '../../components/Write';
import { Error } from '../../components/Base';

class Writing extends Component {

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/write');
    }

    render() {
        const { handleGoBack } = this;

        return (
            <WriteWrapper title = 'Writing Page' onClick = {handleGoBack}>

            </WriteWrapper>
        )
    }
}

export default connect(
    (state) => ({
        logged : state.profile.get('logged'),
        errorProfile : state.profile.get('error'),
        errorWrite : state.write.get('error'),
        writing : state.write.get('writing')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
        WriteActions : bindActionCreators(writeActions, dispatch)
    })
)(Writing)