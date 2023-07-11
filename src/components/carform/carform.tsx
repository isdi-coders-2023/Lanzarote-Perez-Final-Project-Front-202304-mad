import { SyntheticEvent } from 'react';
import './carform.scss';
import { useCars } from '../../hooks/use.cars';

export default function CarForm() {
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
    <form
      className="car-form hidden"
      id="form"
      role="form"
      onSubmit={SubmitNewCar}
    >
      <h2 className="title_form">Add New Car</h2>
      <input type="text" placeholder="Brand" name="carBrand" required></input>
      <input type="text" placeholder="Model" name="carModel" required></input>
      <input type="text" placeholder="Year" name="carYear" required></input>
      <input type="text" placeholder="Horsepower" name="carHP" required></input>
      <div className="select_fuel">
        <select placeholder="Fuel" name="carFuel">
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
          <option value="biofuel">Biofuel</option>
        </select>
      </div>
      <input type="file" placeholder="Photo" name="carPhoto" required></input>
      <button type="submit" className="login_button">
        SUBMIT
      </button>
    </form>
  );
}
