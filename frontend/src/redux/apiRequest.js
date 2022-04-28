import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} from "./userSlice";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(registerFailed());
  }
};
export const logoutUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(logoutStart());
  try {
    const res = await axiosJWT.post("/v1/auth/logout", id, {
      headers: {
        token: "Bearer " + accessToken,
      },
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed());
  }
};
export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await axios.get("/v1/user", {
      headers: {
        token: "Bearer " + accessToken,
      },
    });
    dispatch(getAllUsersSuccess(res.data));
  } catch (error) {
    dispatch(getAllUsersFailed());
  }
};
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: {
        token: "Bearer " + accessToken,
      },
    });
    dispatch(deleteUserSuccess(res.data.msg));
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data));
  }
};
