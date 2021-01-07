//스토어를 생성하는 함수
import { createStore } from 'redux';

import modules from './modules';

//react-hot-loader 적용
const configureStore = (initialState) => {
    const store = createStore(modules, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}

export default configureStore;