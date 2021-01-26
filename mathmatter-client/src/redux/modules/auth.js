import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from '../../lib/api/auth'

//값이 변하지 않게 하는 Map
import { Map } from 'immutable';


const CHANGE_INPUT = 'auth/CHANGE_INPUT';   //input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; //form 초기화

//이메일 중복, 휴대폰번호 중복 확인
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_USERID_EXISTS = 'auth/CHECK_USERID_EXISTS';

//로그인 성공 시 결과 저장
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';

const LOGOUT = 'auth/LOGOUT';

//문자열 오류 검증
const SET_ERROR = 'auth/SET_ERROR';


export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists);
export const checkUserIdExists = createAction(CHECK_USERID_EXISTS, AuthAPI.checkUserIdExists);

//{ userId, email, password }
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
// { email, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);

export const logout = createAction(LOGOUT, AuthAPI.logout);

//{ form, message }
export const setError = createAction(SET_ERROR);

const initialState = Map({
    register : Map({
        form : Map({
            userId : '',
            email : '',
            password : '',
            passwordConfirm : '',
        }),
        exists : Map({
            userId : false,
            email : false
        }),
        error : null
    }),
    login : Map({
        form : Map({
            userId : '',
            password : '',
        }),
        error : null
    }),
    result : Map({})
});

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name],value);
    },
    [INITIALIZE_FORM] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    ...pender({
        type : CHECK_EMAIL_EXISTS,
        onSuccess : (state, action) => state.setIn(['register', 'exists', 'email'], action.payload.data)
    }),
    ...pender({
        type : CHECK_USERID_EXISTS,
        onSuccess : (state, action) => state.setIn(['register', 'exists', 'userId'], action.payload.data)
    }),
    ...pender({
        type : LOCAL_REGISTER,
        onSuccess : (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type : LOCAL_LOGIN,
        onSuccess : (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type : LOGOUT,
        onSuccess : (state, action) => state.set(initialState)
    }),
    [SET_ERROR] : (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    }
}, initialState);