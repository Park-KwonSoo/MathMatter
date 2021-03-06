//어떤 프린트를 진행할 지를 선택하는 컨테이너
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from '../../redux/modules/profile';

import { Contents, PrintMenuWrapper } from '../../components/Print';
import { SelectButton, Error } from '../../components/Base';

import queryString from 'query-string';

class PrintSet extends Component {

    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined)
            this.setError('세션이 만료되었습니다')
    }

    componentWillUnmount() {
        this.setError(null);
    }

    setError = (message) => {
        const { ProfileActions } = this.props;
        ProfileActions.setError({
            message
        });
        return false;
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.push('/print')
    }

    render() {
        const { error } = this.props;
        const { handleGoBack } = this;

        return (
            <PrintMenuWrapper title = 'Select Type' onClick = {handleGoBack}>
                <Contents>
                    <SelectButton to = '/print/set/1'>내신형</SelectButton>
                    <SelectButton to = '/print/set/2'>수능형</SelectButton>
                    <SelectButton to = '/print/set/3'>유형별</SelectButton>
                </Contents>
                <Contents>
                    {
                        error && <Error>{error}</Error>
                    }
                </Contents>
            </PrintMenuWrapper>
        )
    }
}

export default connect (
    (state) => ({
        logged : state.profile.get('logged'),
        error : state.profile.get('error')
    }),
    (dispatch) => ({
        ProfileActions : bindActionCreators(profileActions, dispatch),
    })
)(PrintSet);