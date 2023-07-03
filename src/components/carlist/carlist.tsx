import { Car } from "../../models/user";

export function CarList() {
  const url = "http://localhost:4400/car";

  const response = async () => {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("store")!.slice(10).split('"')[0]
        }`,
      },
    });
    const state = await result.json();
    console.log(state.items);
    return await state.items;
  };

  const result = response();

  return result.then((item: Car) => (
    <div className="cars_container">
      <div className="car_card">
        <figure className="car_card_image">
          <img src={item.carPhoto} alt=""></img>
        </figure>
        <div className="car_card_title">
          <span>{item.carBrand + item.carModel}</span>
        </div>
        <div className="car_card_info">
          <span>Year: {item.carYear}</span>
          <span>HorsePower: {item.carHP}</span>
        </div>
      </div>
    </div>
  ));
}
