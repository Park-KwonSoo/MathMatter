import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as printAPI from '../../lib/api/print';

const INITIALIZE_PRINT = 'print/INITIALIZE_PRINT';
const MAKE_PRINT = 'print/MAKE_PRINT';
const SET_PRINT = 'print/SET_PRINT';
const SET_ERROR = 'print/SET_ERROR';
const GET_PRINT_LIST = 'print/GET_PRINT_LIST';
const GET_PRINT_DETAIL = 'print/GET_PRINT_DETAIL';
const SET_MY_PRINT_LIST_INFO = 'print/SET_MY_PRINT_LIST_INFO';

export const initializePrint = createAction(INITIALIZE_PRINT);
export const makePrint = createAction(MAKE_PRINT);
export const setPrint = createAction(SET_PRINT, printAPI.setPrint);
export const setError = createAction(SET_ERROR);
export const getPrintList = createAction(GET_PRINT_LIST, printAPI.getPrintList);
export const getPrintDetail = createAction(GET_PRINT_DETAIL, printAPI.getPrintDetail);
export const setMyPrintListInfo = createAction(SET_MY_PRINT_LIST_INFO);

const initialState = Map({
    error : null,
    makeInfo : Map({
        semester : {type : Number},
        typeOfExam : Number,
        numberOfQuestion : Number,
        difficulty : Number,
        typeOfPrint : String,
        questionType : Number,
        includeMore : false,
    }),
    resultPrintInfo : Map({}),
    myPrintList : []
});

export default handleActions({
    [INITIALIZE_PRINT] : (state) => state.set(initialState),
    [MAKE_PRINT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['makeInfo', name], value);
    },
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        state.set('error', message);
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