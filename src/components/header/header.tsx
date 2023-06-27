import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName } from "../../config";
import { RootState } from "../../redux/store";

import "./Header.css";
import { logout } from "../../redux/user.Slice";

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userData } = useSelector((state: RootState) => state.user);

  const handleUser = () => {
    if (token) {
      runLogout();
      window.location.reload();
    } else {
      navigate("login");
    }
  };

  const handleRegister = () => {
    console.log("Register");
    navigate("register");
  };

  const runLogout = () => {
    console.log("Logout");
    dispatch(logout());
    localStorage.removeItem(storeName);
  };

  return (
    <>
      <header className="title">
        <div className="title_name">
          <h1>SRC</h1>
        </div>
        <div className="title_info">
          {token ? (
            <>
              <div className="user_info">
                <span className="user_name">
                  Bienvenido, {userData?.userName}
                </span>
                <button onClick={handleUser}>Logout</button>
              </div>
              <figure>
                <img
                  src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                  height={"50px"}
                ></img>
              </figure>
            </>
          ) : (
            <>
              <div className="user_info">
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleUser}>Login</button>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </>
  );
}
