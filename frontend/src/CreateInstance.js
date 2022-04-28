import axios from "axios";
import jwt_decode from "jwt-decode";
const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const generateAxiosJWT = (user, dispatch, state) => {
  let axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let data = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < data.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,

          accessToken: data.accessToken,
        };
        dispatch(state(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return axiosJWT;
};
