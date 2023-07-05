import { SyntheticEvent } from "react";
import "./carform.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCars } from "../../hooks/use.cars";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function CarForm() {
  const navigate = useNavigate();
  const { carData } = useSelector((state: RootState) => state.cars);
  const { handleNewCar } = useCars();

  const SubmitNewCar = async (event: SyntheticEvent) => {
    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    event.preventDefault();

    const data = new FormData(formRegisterElement);
    await handleNewCar(data);

    console.log(data);

    // if (state.error) {
    //   Swal.fire({
    //     icon: "error",
    //     text: `${state.error}`,
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "success",
    //     text: "Succesfully Registered!",
    //   });
    // }

    // state.carData = state.car;
    // delete state.car;
    navigate("/garage");
  };

  return (
    <form className="car-form hidden" id="form" onSubmit={SubmitNewCar}>
      <h2 className="title_form">Edit your car</h2>
      <input type="text" placeholder="Brand" name="carBrand"></input>
      <input type="text" placeholder="Model" name="carModel"></input>
      <input type="text" placeholder="Year" name="carYear"></input>
      <input type="text" placeholder="Horsepower" name="carHP"></input>
      <input type="file" placeholder="Photo" name="carPhoto"></input>
      <button type="submit" className="login_button">
        SUBMIT
      </button>
    </form>
  );
}
