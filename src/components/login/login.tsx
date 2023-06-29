import { SyntheticEvent } from "react";
import "./login.scss";
import { login } from "../../redux/user.Slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName, url } from "../../config";
import Swal from "sweetalert2";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem("user") as HTMLFormElement).value,
      password: (elements.namedItem("password") as HTMLFormElement).value,
    };

    const urlLogin = url + "user/login";
    const response = await fetch(urlLogin, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const state = await response.json();

    console.log(state);
    if (state.error) return Swal.fire({ icon: "error", text: state.error });

    state.userData = state.user;
    delete state.user;
    dispatch(login(state));
    localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
    Swal.fire({
      icon: "success",
      text: "Succesfully logged in!",
    });
    navigate("/");
  };

  return (
    <div className="loaded-route">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="title_form">LOGIN</h2>
        {/* <span className="subtitle">
          LOGIN OR <a href="/register">REGISTER</a> IF YOU DON'T HAVE AN ACCOUNT
        </span> */}
        <input type="text" placeholder="Username / Email" name="user"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
