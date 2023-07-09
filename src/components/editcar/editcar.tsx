import { SyntheticEvent } from 'react';
import { useCars } from '../../hooks/use.cars';
import { Car } from '../../models/car';
import './editcar.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export function EditCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.users);
  const { handleEditCar } = useCars();

  const car: Car = userData.cars?.find((item: Car) => item.id === id) as Car;
  console.log(userData.cars);
  console.log(car, 'yyyyyyyyyyyyyyy');

  const handleEditForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    const data: Partial<Car> = {
      id: car.id,
      carBrand: (
        formRegisterElement.elements.namedItem('carBrand') as HTMLFormElement
      ).value,
      carModel: (
        formRegisterElement.elements.namedItem('carModel') as HTMLFormElement
      ).value,
      carYear: (
        formRegisterElement.elements.namedItem('carYear') as HTMLFormElement
      ).value,
      carHP: (
        formRegisterElement.elements.namedItem('carHP') as HTMLFormElement
      ).value,
    };

    await handleEditCar(data);
    navigate('/garage');
  };

  return (
    <div className="loaded-route">
      <form className="car-form" id="form" onSubmit={handleEditForm}>
        <h2 className="title_form">Edit your car</h2>
        <input type="text" defaultValue={car.carBrand} name="carBrand"></input>
        <input type="text" defaultValue={car.carModel} name="carModel"></input>
        <input type="text" defaultValue={car.carYear} name="carYear"></input>
        <input type="text" defaultValue={car.carHP} name="carHP"></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
