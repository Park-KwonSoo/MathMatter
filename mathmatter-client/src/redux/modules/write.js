import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as WriteAPI from '../../lib/api/write';


const INITIALIZE_WRITING_FORM = 'wrtie/INITIALIZE_WRITING_FORM';
const SET_ERROR = 'write/SET_ERROR';
const WRITE = 'write/WRITE';
const WRITING = 'write/WRITING';
const SEE_BOARD = 'write/SEE_BOARD';
const SEE_MY_WRITING_LIST = 'wrtie/SEE_MY_WRITING_LIST';
const SEE_WRITING = 'write/SEE_WRITING';
const REPLY = 'write/REPLY';
const REPLYING = 'write/REPLYING';
const DELETE_WRITING = 'write/DELETE_WRITING';

export const initializeWritingForm = createAction(INITIALIZE_WRITING_FORM);
export const setError = createAction(SET_ERROR);
export const write = createAction(WRITE);
export const writing = createAction(WRITING, WriteAPI.writing);
export const seeBoard = createAction(SEE_BOARD, WriteAPI.seeBoard);
export const seeMyWritingList = createAction(SEE_MY_WRITING_LIST, WriteAPI.seeMyWritingList);
export const seeWriting = createAction(SEE_WRITING, WriteAPI.seeWriting);
export const reply = createAction(REPLY);
export const replying = createAction(REPLYING, WriteAPI.replying);
export const deleteWriting = createAction(DELETE_WRITING, WriteAPI.deleteWriting);

const initialState = Map ({
    error : null,
    board : [],
    myWritingList : [],
    writing : Map({
        title : '',
        body : '',
    }),
    replying : Map({
        body : '',
    }),
    viewing : Map({
        userId : '',
        title : '',
        body : '',
        date : Date,
        comments : [],
        postId : Number
    })
});

export default handleActions({
    [INITIALIZE_WRITING_FORM] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    [WRITE] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['writing', name], value);
    },
    [REPLY] : (state, action) => state.set('replying', action.payload),
    ...pender({
        type : WRITING,
        onSuccess : (state, action) => state.set('viewing', Map(action.payload.data))
    }),
    ...pender({
        type : SEE_BOARD,
        onSuccess : (state, action) => state.set('board', action.payload.data)
    }),
    ...pender({
        type : SEE_MY_WRITING_LIST,
        onSuccess : (state, action) => state.set('myWritingList', action.payload.data)
    }),
    ...pender({
        type : SEE_WRITING,
        onSuccess : (state, action) => state.set('viewing', Map(action.payload.data))
    }),
    ...pender({
        type : REPLYING,
    }),
    ...pender({
        type : DELETE_WRITING,
        onSuccess : (state) => state.set('viewing', initialState.get('viewing'))
    })
}, initialState);