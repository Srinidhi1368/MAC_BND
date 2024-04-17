import { createSlice } from "@reduxjs/toolkit";
const ReduxFilterSlice = createSlice({
    name: "ReduxSlice",
    initialState: {
        FilterOptions: {
            JobType: [],
            JobCategory: [],
            JobLevel: [],
            SalaryRange: [],
        }
    },
    reducers: {
        handleSetFilterData(state, action) {
            state.FilterOptions[`${action.payload.name}`].push(action.payload.value);
        },

        handleRemoveFilterData(state, action) {
            state.FilterOptions[`${action.payload.name}`].splice(state.FilterOptions[`${action.payload.name}`].indexOf(action.payload.value), 1);
        },
    },
});
export const {
    handleSetFilterData,
    handleRemoveFilterData
} = ReduxFilterSlice.actions;
export default ReduxFilterSlice.reducer;
