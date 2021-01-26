import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HeaderContainer from './containters/Base/HeaderContainer';
import { Home, Auth } from './pages';

import storage from './lib/storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from './redux/modules/profile';

class App extends Component {

  initializeUserInfo = async() => {
    const loggedInfo = storage.get('loggedInfo'); //로그인 정보를 로컬 스토리지에서 가져옴
    if(!loggedInfo) return; //로그인되어있지 않으면 중지

    const { ProfileActions } = this.props;
    await ProfileActions.setLoggedInfo();

    try {
      await ProfileActions.checkStatus();
    } catch(e) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
        <div>
          <HeaderContainer/>
          <Route exact path = '/' component = { Home }/>
          <Route path = '/auth' component = { Auth }/>
        </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    ProfileActions : bindActionCreators(profileActions, dispatch)
  })
)(App);