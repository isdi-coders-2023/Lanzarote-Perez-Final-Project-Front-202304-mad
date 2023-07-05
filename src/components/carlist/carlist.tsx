import { useSelector } from "react-redux";
import { Car } from "../../models/car";
import { RootState } from "../../redux/store";
import "./carlist.scss";
import { CarlistCard } from "../carlistCard/carlistcard";
import { useEffect } from "react";
import { useCars } from "../../hooks/use.cars";

export function CarList() {
  const { userData } = useSelector((state: RootState) => state.users);
  const { handleLoadCars } = useCars();

  const handleCars = async () => {
    await handleLoadCars();
  };

  useEffect(() => {
    handleCars();
  }, []);

  return (
    <div className="cars_container">
      {userData.cars?.map((item: Car) => (
        <CarlistCard item={item} key={item.id}></CarlistCard>
      ))}
    </div>
  );
}
