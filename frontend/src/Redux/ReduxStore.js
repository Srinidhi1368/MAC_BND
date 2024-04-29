import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice.js';
import ReduxFilterSlice from './ReduxFilterSlice.js';
import fetchJobDetails  from './JobSlice.js';
const ReduxStore = configureStore({
    reducer : {
        Assessment:ReduxSliceReducer,
        Filter : ReduxFilterSlice,
        Job:fetchJobDetails
    }
});
export default ReduxStore