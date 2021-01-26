import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';
import * as ProfileAPI from '../../lib/api/profile'
import { pender } from 'redux-pender';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; //로그인 정보 설정
const SET_VALIDATED = 'user/SET_VALIDATED'; //validated값 설정
const LOGOUT = 'user/LOGOUT';   //로그아웃
const CHECK_STATUS = 'user/CHECK_STATUS'    //현재 로그인 상태 확인

export const setLoggedInfo = createAction(SET_LOGGED_INFO, ProfileAPI.setLoggedInfo);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

const initialState = Map({
    loggedInfo : Map({
        //userName : null,
        userId : null
    }),
    logged : false,
    validated : false
});

export default handleActions({
    //[SET_LOGGED_INFO] : (state, action) => state.set('loggedInfo', Map(action.payload.data)).set('logged', true),
    [SET_VALIDATED] : (state, action) => state.set('validated', action.payload),
    ...pender({
        type : CHECK_STATUS,
        onSuccess : (state, action) => state.setIn(['loggedInfo', 'userId'], action.payload.data).set('validated', true),
        onFailure : () => (initialState)
    }),
    ...pender({
        type : SET_LOGGED_INFO,
        onSuccess : (state, action) => state.set('loggedInfo', Map(action.payload.data)).set('logged', true)
    })
}, initialState);