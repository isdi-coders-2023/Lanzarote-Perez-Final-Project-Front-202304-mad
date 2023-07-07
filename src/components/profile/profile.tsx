import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./profile.scss";

export function Profile() {
  const imageUrl = "http://localhost:4400/";
  const { userData } = useSelector((state: RootState) => state.users);

  return (
    <div className="loaded-route">
      <div className="profile_card" key={userData.id}>
        <figure className="profile_image">
          <img
            src={userData.avatar?.imageUrl}
            width={"200"}
            alt={userData.userName}
          ></img>
        </figure>
        <div className="profile_info">
          <span>👋 {userData.userName}</span>
          <span>📧 {userData.email}</span>
          <span>📍 {userData.location}</span>
          <span>📱 {userData.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
