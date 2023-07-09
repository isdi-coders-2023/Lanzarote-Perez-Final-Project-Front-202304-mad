import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";
type PropsType = {
  item: User;
};

export function Card({ item }: PropsType) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/userDetails/" + item.id);
  };
  return (
    <div className="user_card" key={item.id} onClick={handleClick}>
      <div className="user_card_info">
        <span className="username">{item.userName}</span>
        <span className="location">📍 {item.location}</span>
      </div>
      <div className="user_image">
        <figure>
          <img
            className="image"
            src={item.avatar.imageUrl}
            width={"150"}
            height={"150"}
          ></img>
        </figure>
      </div>
    </div>
  );
}
