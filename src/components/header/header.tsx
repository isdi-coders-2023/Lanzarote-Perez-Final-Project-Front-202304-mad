import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName } from "../../config";

import "./Header.scss";
import { UsersState } from "../../redux/user.Slice";
import Swal from "sweetalert2";
import { useUsers } from "../../hooks/use.user";

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  const imageUrl = "http://localhost:4400/";

  const { handleLogoutUser } = useUsers();
  const { token, currentUser } = useSelector((state: UsersState) => state);

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
    //handleLogoutUser(currentUser);
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
                <span className="user_name">{currentUser?.userName}</span>
                <button onClick={handleUser} className="logout_button">
                  Logout
                </button>
              </div>
              <figure className="image_container">
                <img
                  src={imageUrl + currentUser.avatar?.urlOriginal}
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
