import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';
import * as ProfileAPI from '../../lib/api/profile'
import { pender } from 'redux-pender';

const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';

const SET_LOGGED_INFO = 'profile/SET_LOGGED_INFO'; //로그인 정보 설정
const SET_VALIDATED = 'profile/SET_VALIDATED'; //validated값 설정
const LOGOUT = 'profile/LOGOUT';   //로그아웃
const CHECK_STATUS = 'profile/CHECK_STATUS'    //현재 로그인 상태 확인

const SET_ERROR = 'profile/SET_ERROR';  //에러 설정

const GET_PROFILE_INFO = 'profile/GET_PROFILE_INFO';    //로그인된 유저의 프로필 가져옴
const PATCH_PROFILE_INFO = 'profile/PATCH_PROFILE_INFO';    //로그인한 유저의 프로필 정보를 패치함

export const changeProfile = createAction(CHANGE_PROFILE);

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

export const setError = createAction(SET_ERROR);

export const getProfileInfo = createAction(GET_PROFILE_INFO, ProfileAPI.getProfile);
export const patchProfileInfo = createAction(PATCH_PROFILE_INFO, ProfileAPI.patchProfile);

const initialState = Map({
    changeInfo : Map({
        birth : '',
        phoneNumber : '',
        userName : ''
    }),
    loggedInfo : Map({
        userId : ''
    }),
    logged : false,
    validated : false,
    error : null,
    profileInfo : Map({})
});

export default handleActions({
    [CHANGE_PROFILE] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['changeInfo', name], value);
    },
    [SET_LOGGED_INFO] : (state, action) => {
        const { userId } = action.payload;
        return state.set('loggedInfo', userId).set('logged', true);
    },
    [SET_VALIDATED] : (state, action) => state.set('validated', action.payload),
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message)
    },
    ...pender({
        type : CHECK_STATUS,
        onSuccess : (state, action) => state.setIn(['loggedInfo', 'userId'], action.payload.data).set('validated', true),
        onFailure : () => (initialState)
    }),
    ...pender({
        type : GET_PROFILE_INFO,
        onSuccess : (state, action) => state.set('profileInfo', action.payload.data)
    }),
    ...pender({
        type : PATCH_PROFILE_INFO,
        onSuccess : (state, action) => state.set('profileInfo', action.payload.data)
    })
}, initialState);