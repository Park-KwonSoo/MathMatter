import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as PrintAPI from '../../lib/api/print';


const INITIALIZE_MAKE_PRINT = 'print/INITIALIZE_MAKE_PRINT';
const MAKE_PRINT = 'print/MAKE_PRINT';
const SET_PRINT = 'print/SET_PRINT';
const SET_ERROR = 'print/SET_ERROR';
const GET_PRINT_LIST = 'print/GET_PRINT_LIST';
const GET_PRINT_DETAIL = 'print/GET_PRINT_DETAIL';
const SET_MY_PRINT_LIST_INFO = 'print/SET_MY_PRINT_LIST_INFO';

export const initializeMakePrint = createAction(INITIALIZE_MAKE_PRINT);
export const makePrint = createAction(MAKE_PRINT);
export const setPrint = createAction(SET_PRINT, PrintAPI.setPrint);
export const setError = createAction(SET_ERROR);
export const getPrintList = createAction(GET_PRINT_LIST, PrintAPI.getPrintList);
export const getPrintDetail = createAction(GET_PRINT_DETAIL, PrintAPI.getPrintDetail);
export const setMyPrintListInfo = createAction(SET_MY_PRINT_LIST_INFO);

const initialState = Map({
    error : null,
    makeInfo : Map({
        semester : Number,
        typeOfExam : Number,
        numberOfQuestion : Number,
        difficulty : Number,
        questionType : Number,
        month : Number,
        includeMore : false,
    }),
    resultPrintInfo : Map({}),
    myPrintList : []
});

export default handleActions({
    [INITIALIZE_MAKE_PRINT] : (state) => state.set('makeInfo', initialState.get('makeInfo')),
    [MAKE_PRINT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['makeInfo', name], value);
    },
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    [SET_MY_PRINT_LIST_INFO] : (state, action) => state.set('myPrintList', action.payload),
    ...pender({
        type : SET_PRINT,
        onSuccess : (state, action) => state.set('resultPrintInfo', Map(action.payload.data))
    }),
    ...pender({
        type : GET_PRINT_LIST,
        onSuccess : (state, action) => state.set('myPrintList', action.payload.data)
    }),
    ...pender({
        type : GET_PRINT_DETAIL,
        onSuccess : (state, action) => state.set('resultPrintInfo', Map(action.payload.data))
    })
}, initialState);