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
    console.log(response.body);
    const state = await response.json();

    if (state.error) {
      Swal.fire({
        icon: "error",
        text: `${state.error}`,
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "Succesfully Registered!",
      });
    }

    console.log(state);

    state.userData = state.user;
    delete state.user;
    navigate("/login");
  };

  return (
    <div className="loaded-route">
      <form className="register-form" id="form" onSubmit={handleRegister}>
        <h2 className="title_form">REGISTER</h2>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          required
        ></input>
        <input type="email" placeholder="Email" name="email" required></input>
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        ></input>
        <input
          type="text"
          placeholder="Phone number"
          name="phoneNumber"
          required
        ></input>
        <input type="file" placeholder="Avatar" name="avatar" required></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
