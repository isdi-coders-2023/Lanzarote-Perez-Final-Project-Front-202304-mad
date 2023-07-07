import { Link, useParams } from "react-router-dom";
import { Car } from "../../models/car";
import "./carlistcard.scss";
import { useCars } from "../../hooks/use.cars";

type PropsType = {
  item: Car;
};
export function CarlistCard({ item }: PropsType) {
  const { handleDeleteCar } = useCars();

  const handleDelete = () => {
    handleDeleteCar(item.id);
    window.location.reload();
  };

  return (
    <div className="car_card" key={item.carModel}>
      <figure className="car_card_image">
        <img
          src={item.carPhoto.imageUrl}
          width={150}
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
          <button onClick={handleDelete}>DELETE</button>
        </div>
        <div className="car_card_info">
          <span>{item.carBrand + " " + item.carModel}</span>
          <span>Year: {item.carYear}</span>
          <span>HP: {item.carHP}</span>
          <span>Fuel: {item.carFuel}</span>
        </div>
      </div>
    </div>
  );
}
