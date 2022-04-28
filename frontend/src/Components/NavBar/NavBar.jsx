import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { generateAxiosJWT } from "../../CreateInstance";
import { logoutUser } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import "./navbar.css";
const NavBar = () => {
  // const [user,setUSer] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log();
  let axiosJWT = generateAxiosJWT(user, dispatch, logoutSuccess);
  const handleLogout = async () => {
    await logoutUser(user?.accessToken, dispatch, user?.user._id, axiosJWT);
    navigate("/");
  };
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        {" "}
        Home{" "}
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.user.username} </span>{" "}
          </p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
            {" "}
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            {" "}
            Login{" "}
          </Link>
          <Link to="/register" className="navbar-register">
            {" "}
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
