import { useSelector } from "react-redux";
import { Car } from "../../models/user";
import { RootState } from "../../redux/store";
import "./carlist.scss";

export function CarList() {
  const imageUrl = "http://localhost:4400/";
  const { userData } = useSelector((state: RootState) => state.users);

  return (
    <div className="cars_container">
      {userData.cars?.map((item: Car) => (
        <div className="car_card" key={item.carModel}>
          <figure className="car_card_image">
            <img
              src={imageUrl + item.carPhoto.urlOriginal}
              width={200}
              height={120}
              alt={item.carModel}
            ></img>
          </figure>
          <div className="car_card_info">
            <span>{item.carBrand + "" + item.carModel}</span>
            <span>Year: {item.carYear}</span>
            <span>HorsePower: {item.carHP}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
