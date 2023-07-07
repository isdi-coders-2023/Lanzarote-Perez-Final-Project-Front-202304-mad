import { SyntheticEvent } from "react";
import "./carform.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCars } from "../../hooks/use.cars";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function CarForm() {
  const navigate = useNavigate();
  const { handleNewCar } = useCars();

  const SubmitNewCar = async (event: SyntheticEvent) => {
    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    event.preventDefault();

    const data = new FormData(formRegisterElement);
    await handleNewCar(data);

    window.location.reload();
  };

  return (
    <form className="car-form hidden" id="form" onSubmit={SubmitNewCar}>
      <h2 className="title_form">Add New Car</h2>
      <input type="text" placeholder="Brand" name="carBrand"></input>
      <input type="text" placeholder="Model" name="carModel"></input>
      <input type="text" placeholder="Year" name="carYear"></input>
      <input type="text" placeholder="Horsepower" name="carHP"></input>
      <label htmlFor="carFuel">Fuel type:</label>
      <div className="select_fuel">
        <select placeholder="Fuel" name="carFuel">
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
          <option value="biofuel">Biofuel</option>
        </select>
      </div>
      <input type="file" placeholder="Photo" name="carPhoto"></input>
      <button type="submit" className="login_button">
        SUBMIT
      </button>
    </form>
  );
}
