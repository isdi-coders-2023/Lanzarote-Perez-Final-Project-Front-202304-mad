import { SyntheticEvent } from "react";
import "./carform.scss";
import { url } from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CarForm() {
  const navigate = useNavigate();

  const handleNewCar = async (event: SyntheticEvent) => {
    const formRegisterElement: HTMLFormElement =
      document.querySelector(".car-form")!;

    event.preventDefault();

    const data = new FormData(formRegisterElement);

    console.log(formRegisterElement);

    const urlRegister = url + "car/create";
    const response = await fetch(urlRegister, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("store")!.slice(10).split('"')[0]
        }`,
      },
      body: data,
    });
    const state = await response.json();

    console.log(
      `Bearer ${localStorage.getItem("store")!.slice(10).split('"')[0]}`
    );
    console.log(state);

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

    state.carData = state.car;
    delete state.car;
    navigate("/garage");
  };

  return (
    <form
      className="car-form"
      id="form"
      encType="multipart/form-data"
      onSubmit={handleNewCar}
    >
      <h2 className="title_form">REGISTER</h2>
      <input type="text" placeholder="Brand" name="carBrand"></input>
      <input type="text" placeholder="Model" name="carModel"></input>
      <input type="text" placeholder="Year" name="carYear"></input>
      <input type="text" placeholder="Horsepower" name="carHP"></input>
      <input type="file" placeholder="Image" name="carPhoto"></input>
      <button type="submit" className="login_button">
        SUBMIT
      </button>
    </form>
  );
}
