import CarForm from "../carform/carform";
import { CarList } from "../carlist/carlist";
import "./garage.scss";

export default function Garage() {
  const handleForm = () => {
    const form = document.querySelector(".car-form")!;
    form.classList.toggle("hidden");
  };

  return (
    <>
      <div className="loaded-route garage">
        <span className="garage_title">Garage</span>
        <button className="garage_button" onClick={handleForm}>
          SHOW / HIDE FORM
        </button>
        <CarForm></CarForm>
        <h1 className="home_title">Your Cars</h1>
        <CarList></CarList>
      </div>
    </>
  );
}
