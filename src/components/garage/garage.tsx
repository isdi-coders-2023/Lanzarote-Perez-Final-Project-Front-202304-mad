import { lazy } from "react";
import CarForm from "../carform/carform";
import "./garage.scss";

const CarForm = lazy(() => import("../carform/carform"));

export default function Garage() {
  const handleAddNewCar = () => {
    console.log("Add new car");
    document.querySelector(".garage_button")!.append();
  };

  return (
    <>
      <div className="loaded-route">
        <button className="garage_button" onClick={handleAddNewCar}>
          ADD NEW CAR
        </button>
        <CarForm></CarForm>
        <h1 className="home_title">Your Cars</h1>
      </div>
    </>
  );
}
