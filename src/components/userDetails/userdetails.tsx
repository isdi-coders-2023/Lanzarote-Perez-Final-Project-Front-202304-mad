import { useParams } from "react-router-dom";
import "./userdetails.scss";
import { User } from "../../models/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Car } from "../../models/car";

export default function UserDetails() {
  const { id } = useParams();
  const { userList } = useSelector((state: RootState) => state.users);

  const imageUrl = "http://localhost:4400";
  const user: User = userList.find((item: User) => item.id === id) as User;

  console.log(user);

  return (
    <div className={"loaded-route"}>
      <ul className={"user_details_card"}>
        <li>#{user.id}</li>
        <img
          className={"user_details_image"}
          src={imageUrl + user.avatar.urlOriginal}
          alt="character-portrait"
        />
        <div className={"user_data"}>
          <div className={"user_info"}>
            <li>{user.userName}</li>
            <li>Location: {user.location}</li>
            <li>Email: {user.email}</li>
          </div>
          {user.cars?.map((item: Car) => (
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
                <span>{item.carBrand + " " + item.carModel}</span>
                <span>Year: {item.carYear}</span>
                <span>HorsePower: {item.carHP}</span>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
