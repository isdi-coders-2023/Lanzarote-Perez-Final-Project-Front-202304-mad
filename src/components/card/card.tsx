import { Link } from "react-router-dom";
import { User } from "../../models/user";

type PropsType = {
  item: User;
};

export function Card({ item }: PropsType) {
  const imageUrl = "http://localhost:4400";
  return (
    <Link to={"/userDetails/" + item.id}>
      <div className="user_card" key={item.id}>
        <div className="user_card_info">
          <span className="username">{item.userName}</span>
          <span className="location">📍 {item.location}</span>
        </div>
        <div className="user_image">
          <figure>
            <img
              className="image"
              src={imageUrl + item.avatar.urlOriginal}
              width={"150"}
              height={"150"}
            ></img>
          </figure>
        </div>
      </div>
    </Link>
  );
}
