import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Car } from "../../models/car";
import { RootState } from "../../redux/store";
import "./carlist.scss";
import { CarlistCard } from "../carlistCard/carlistcard";
import { useUsers } from "../../hooks/use.user";

export function CarList() {
  const { handleLoadUsers } = useUsers();
  const { userData } = useSelector((state: RootState) => state.users);
  const { userList } = useSelector((state: RootState) => state.users);
  const [cars, setCars] = useState<Car[]>([]);

  const ReloadUserList = async () => {
    await handleLoadUsers();
    const desiredUser = userList.find((user) => userData.id === user.id);
    console.log(desiredUser, "yyyyyeeeeejah");
    return desiredUser;
  };

  const loadCarsAndRender = async () => {
    const userWithCars = await ReloadUserList();
    if (userWithCars) {
      setCars(userWithCars.cars);
    }
  };

  useEffect(() => {
    loadCarsAndRender();
  }, []);

  return (
    <div className="cars_container">
      {cars.map((item: Car) => (
        <CarlistCard item={item} key={item.id}></CarlistCard>
      ))}
    </div>
  );
}
