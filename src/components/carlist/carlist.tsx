import { useSelector } from "react-redux";
import { Car } from "../../models/car";
import { RootState } from "../../redux/store";
import "./carlist.scss";
import { CarlistCard } from "../carlistCard/carlistcard";
import { useEffect } from "react";
import { useCars } from "../../hooks/use.cars";
import jwtDecode from "jwt-decode";
import { User } from "../../models/user";
import { useUsers } from "../../hooks/use.user";

export function CarList() {
  const { handleLoginWithToken } = useUsers();
  const { userData } = useSelector((state: RootState) => state.users);

  return (
    <div className="cars_container">
      {userData.cars?.map((item: Car) => (
        <CarlistCard item={item} key={item.id}></CarlistCard>
      ))}
    </div>
  );
}
