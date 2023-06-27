import { SyntheticEvent } from "react";
import "./register.scss";
import { url } from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (event: SyntheticEvent) => {
    const formRegisterElement: HTMLFormElement =
      document.querySelector(".register-form")!;
    event.preventDefault();

    const data = new FormData(formRegisterElement);

    const urlRegister = url + "user/register";
    const response = await fetch(urlRegister, {
      method: "POST",
      headers: {},
      body: data,
    });
    const state = await response.json();

    console.log(state);

    state.userData = state.user;
    delete state.user;
    Swal.fire({
      icon: "success",
      text: "Succesfully Registered!",
    });
    navigate("/login");
  };

  return (
    <div className="loaded-route">
      <form className="register-form" id="form" onSubmit={handleRegister}>
        <h2 className="title_form">REGISTER</h2>
        <input type="text" placeholder="Username" name="userName"></input>
        <input type="text" placeholder="Email" name="email"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <input type="file" placeholder="Avatar" name="avatar"></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
