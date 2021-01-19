import { createAction, handleActions } from 'redux-actions';

//값이 변하지 않게 하는 Map
import { Map } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';   //input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; //form 초기화

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = Map({
    register : Map({
        form : Map({
            phoneNumber : '',
            email : '',
            password : '',
            passwordConfirm : '',
        })
    }),
    login : Map({
        form : Map({
            email : '',
            password : '',
        })
    })
});

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name],value);
    },
    [INITIALIZE_FORM] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    }
}, initialState);