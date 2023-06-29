import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName } from "../../config";
import { RootState } from "../../redux/store";

import "./Header.scss";
import userSlice, { logout } from "../../redux/user.Slice";
import Swal from "sweetalert2";

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageUrl = "http://localhost:4400/";

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
    Swal.fire({ icon: "success", text: "Succesfully logged out!" });
    dispatch(logout());
    localStorage.removeItem(storeName);
    navigate("/");
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
                <span className="user_name">{userData?.userName}</span>
                <button onClick={handleUser} className="logout_button">
                  Logout
                </button>
              </div>
              <figure className="image_container">
                <img
                  src={imageUrl + userData?.avatar.urlOriginal}
                  height={"50px"}
                  width={"50px"}
                ></img>
              </figure>
            </>
          ) : (
            <>
              <div className="user_info user_buttons">
                <button onClick={handleRegister} className="register_button">
                  Register
                </button>
                <button onClick={handleUser} className="login_button">
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </>
  );
}
