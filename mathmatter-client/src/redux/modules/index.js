import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import profile from './profile';
import print from './print';
import write from './write';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    profile,
    print,
    write,
    pender : penderReducer
});