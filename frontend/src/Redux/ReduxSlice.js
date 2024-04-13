import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    selectedOption: {},
    result: 0,
    percentageResult: 0,
    currentUser: {
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
      name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
      userType: localStorage.getItem("userType")
        ? localStorage.getItem("userType")
        : "",
    },
  },
  reducers: {
    handleSelectedOption(state, action) {
      state.selectedOption[`${action.payload.questionNum}`] =
        action.payload.tempSelection;
    },

    calculatedResult(state, action) {
      state.selectedOption = {};
      state.result = action.payload;
      state.percentageResult = ((action.payload * 10) / 100) * 100 + "%";
    },
    handleClearResult(state) {
      state.selectedOption = {};
      state.result = 0;
      state.percentageResult = 0;
    },

    handleUserLogin(state, action) {
      state.currentUser.token = action.payload.token;
      state.currentUser.email = action.payload.email;
      state.currentUser.name = action.payload.name;
      state.currentUser.userType = action.payload.userType;

      localStorage.setItem("token", state.currentUser.token);
      localStorage.setItem("email", state.currentUser.email);
      localStorage.setItem("name", state.currentUser.name);
      localStorage.setItem("userType", state.currentUser.userType);
    },
    handleUserLogOut(state) {
      state.currentUser.token = "";
      state.currentUser.email = "";
      state.currentUser.name = "";
      state.currentUser.userType = "";

      localStorage.clear()
    },
  },
});
export const {
  handleSelectedOption,
  calculatedResult,
  handleClearResult,
  handleUserLogin,
  handleUserLogOut,
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
