import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import profile from './profile';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    profile,
    pender : penderReducer
});