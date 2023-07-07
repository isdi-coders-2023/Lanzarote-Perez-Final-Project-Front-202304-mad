import { SyntheticEvent } from "react";
import "./login.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeName, url } from "../../config";
import Swal from "sweetalert2";
import { useUsers } from "../../hooks/use.user";

export default function Login() {
  const navigate = useNavigate();
  const { handleLoginUser } = useUsers();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem("user") as HTMLFormElement).value,
      password: (elements.namedItem("password") as HTMLFormElement).value,
    };
    console.log(data);
    await handleLoginUser(data);

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
        <button type="submit" className="login_button_submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
