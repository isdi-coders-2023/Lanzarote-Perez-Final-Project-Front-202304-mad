import CarForm from '../carform/carform';
import { CarList } from '../carlist/carlist';
import './garage.scss';

export default function Garage() {
  const handleForm = () => {
    const form = document.querySelector('.car-form')!;
    form.classList.toggle('hidden');
  };

  return (
    <>
      <div className="loaded-route garage">
        <button className="garage_button" onClick={handleForm}>
          <span className="show_hide">Show / Hide form</span>
        </button>
        <CarForm></CarForm>
        <CarList></CarList>
      </div>
    </>
  );
}
