import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SET_CURRENT_PAGE = 'base/SET_CURRENT_PAGE';
const SET_POSTS_PER_PAGE = 'base/SET_POSTS_PER_PAGE';

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY);
export const setCurrentPage = createAction(SET_CURRENT_PAGE);
export const setPostsPerPage = createAction(SET_POSTS_PER_PAGE);

const initialState = Map({
    header : Map({
        visible : true
    }),
    currentPage : 1,
    postsPerPage : 10,
});

export default handleActions({
    [SET_HEADER_VISIBILITY] : (state, action) => state.setIn(['header', 'visible'], action.payload),
    [SET_CURRENT_PAGE] : (state, action) => state.set('currentPage', action.payload),
    [SET_POSTS_PER_PAGE] : (state, action) => state.set('postsPerPage', action.payload)
}, initialState);