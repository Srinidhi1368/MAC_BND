import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice.js';
import ReduxFilterSlice from './ReduxFilterSlice.js';
const ReduxStore = configureStore({
    reducer : {
        Assessment:ReduxSliceReducer,
        Filter : ReduxFilterSlice
    }
});
export default ReduxStore