import { useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { generateAxiosJWT } from "../../CreateInstance";
const HomePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.users.user.allUsers);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user", user);

  let axiosJWT = generateAxiosJWT(user, dispatch, loginSuccess);
  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/v1/auth/refresh", {
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let data = new Date();
  //     const decodedToken = jwt_decode(user?.accessToken);
  //     if (decodedToken.exp < data.getTime() / 1000) {
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...user,

  //         accessToken: data.accessToken,
  //       };
  //       console.log("user 1", user);
  //       console.log("user 2", refreshUser);
  //       dispatch(loginSuccess(refreshUser));
  //       config.headers["token"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    getAllUsers(user?.accessToken, dispatch);
  }, []);
  const handleDelete = (id) => {
    // console.log(id);
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.user.isAdmin ? "Admin" : "User"}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </div>
            </div>
          );
        })}
        <div>{msg}</div>
      </div>
    </main>
  );
};

export default HomePage;
