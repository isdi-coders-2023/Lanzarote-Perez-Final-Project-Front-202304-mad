import { Link } from "react-router-dom";
import { Car } from "../../models/car";
import "./carlistcard.scss";

type PropsType = {
  item: Car;
};
export function CarlistCard({ item }: PropsType) {
  return (
    <div className="car_card" key={item.carModel}>
      <figure className="car_card_image">
        <img
          src={item.carPhoto.imageUrl}
          width={200}
          height={146.3}
          className="image"
          alt={item.carModel}
        ></img>
      </figure>
      <div className="car_panel">
        <div className="car_card_actions">
          <Link to={"/editcar/" + item.id} key={item.id}>
            <img
              src="https://cdn.discordapp.com/attachments/1107620717312344084/1125790460527530085/png-removebg-preview.png"
              height={"30px"}
              className="edit_button"
            />
          </Link>
          <button>DELETE</button>
        </div>
        <div className="car_card_info">
          <span>{item.carBrand + " " + item.carModel}</span>
          <span>Year: {item.carYear}</span>
          <span>HP: {item.carHP}</span>
        </div>
      </div>
    </div>
  );
}
