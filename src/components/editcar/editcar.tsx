import { SyntheticEvent } from "react";
import { useCars } from "../../hooks/use.cars";
import { Car } from "../../models/car";
import "./editcar.scss";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export function EditCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { carList } = useSelector((state: RootState) => state.cars);
  const { handleEditCar } = useCars();

  const car: Car = carList.find((item: Car) => item.id === id) as Car;
  console.log(car, "yyyyyyyyyyyyyyy");

  const handleEditForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    const data = formRegisterElement;
    await handleEditCar(data);
    navigate("/garage");
  };

  return (
    <div className="loaded-route">
      <form className="car-form" id="form" onSubmit={handleEditForm}>
        <h2 className="title_form">Edit your car</h2>
        <input type="text" placeholder={car.carBrand} name="carBrand"></input>
        <input type="text" placeholder={car.carModel} name="carModel"></input>
        <input type="text" placeholder={car.carYear} name="carYear"></input>
        <input type="text" placeholder={car.carHP} name="carHP"></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
