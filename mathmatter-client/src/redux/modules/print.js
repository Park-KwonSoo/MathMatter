import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as printAPI from '../../lib/api/print';

const INITIALIZE_PRINT = 'print/INITIALIZE_PRINT';
const SET_PRINT_TYPE = 'print/SET_PRINT_TYPE';
const SET_PRINT = 'print/SET_PRINT';
const SET_ERROR = 'print/SET_ERROR';
const GET_PRINT_LIST = 'print/SET_PRINT_LIST';

export const initializePrint = createAction(INITIALIZE_PRINT);
export const setPrintType = createAction(SET_PRINT_TYPE);
export const setPrint = createAction(SET_PRINT, printAPI.setPrint);
export const setError = createAction(SET_ERROR);
export const getPrintList = createAction(GET_PRINT_LIST, printAPI.getPrintList);

const initialState = Map({
    type : null,
    error : null,
    resultPrintInfo : Map({}),
    myPrintList : []
});

export default handleActions({
    [INITIALIZE_PRINT] : (state) => state.set(initialState),
    [SET_PRINT_TYPE] : (state, action) => state.set('type', action.payload.data),
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        state.set('error', message);
    },
    ...pender({
        type : SET_PRINT,
        onSuccess : (state, action) => state.set('resultPrintInfo', action.payload.data)
    }),
    ...pender({
        type : GET_PRINT_LIST,
        onSuccess : (state, action) => state.set('myPrintList', action.payload.data)
    })
}, initialState);