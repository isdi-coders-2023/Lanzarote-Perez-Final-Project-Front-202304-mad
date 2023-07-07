import { useParams } from "react-router-dom";
import "./userdetails.scss";
import { User } from "../../models/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Car } from "../../models/car";

export default function UserDetails() {
  const { id } = useParams();
  const { userList } = useSelector((state: RootState) => state.users);

  const user: User = userList.find((item: User) => item.id === id) as User;

  const checkIfTieso = () => {
    if (user.cars.length < 0) {
      return true;
    }
  };

  console.log(user);

  return (
    <div className={"loaded-route"}>
      <ul className={"user_details_card"}>
        <li>ID: #{user.id}</li>
        <img
          className={"user_details_image"}
          src={user.avatar.imageUrl}
          alt="character-portrait"
        />
        <div className={"user_data"}>
          <div className={"user_properties"}>
            <li>Username: {user.userName}</li>
            <li>Location: {user.location}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phoneNumber}</li>
          </div>

          {checkIfTieso() ? (
            <h3>This user doesn't have registered cars</h3>
          ) : (
            user.cars?.map((item: Car) => (
              <div className="car_card" key={item.carModel}>
                <figure className="car_card_image">
                  <img
                    className="car_image"
                    src={item.carPhoto.imageUrl}
                    alt={item.carModel}
                  ></img>
                </figure>
                <div className="car_card_info">
                  <span>{item.carBrand + " " + item.carModel}</span>
                  <span>Year: {item.carYear}</span>
                  <span>HorsePower: {item.carHP}</span>
                  <span>Fuel: {item.carFuel}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </ul>
    </div>
  );
}
