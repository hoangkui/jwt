import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    loginUser(newUser, dispatch, navigate);
    console.log(newUser);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleLogin}>
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Continue </button>
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free{" "}
      </Link>
    </section>
  );
};

export default Login;
