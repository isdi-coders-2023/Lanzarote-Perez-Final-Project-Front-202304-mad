import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName } from "../../config";

import "./Header.scss";
import Swal from "sweetalert2";
import { RootState } from "../../redux/store";

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { token, userData } = useSelector((state: RootState) => state.users);

  const handleUser = () => {
    if (token) {
      runLogout();
      window.location.reload();
    } else {
      navigate("login");
    }
  };

  const handleRegister = () => {
    navigate("register");
  };

  const runLogout = () => {
    Swal.fire({ icon: "success", text: "Succesfully logged out!" });
    //
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
                  src={userData.avatar?.imageUrl}
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
