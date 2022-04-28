import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    allUsers: null,
    isFetching: false,
    error: false,
  },
  msg: "",
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsersStart: (state) => {
      state.user.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.allUsers = action.payload;
      state.user.error = false;
    },
    getAllUsersFailed: (state) => {
      state.user.isFetching = false;
      state.user.error = true;
    },
    deleteUserStart: (state) => {
      state.user.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.user.isFetching = false;
      state.user.error = true;
      state.msg = action.payload;
    },
  },
});
export const {
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
