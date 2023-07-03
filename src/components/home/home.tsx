import { useEffect } from "react";
import { useUsers } from "../../hooks/use.user";
import "./home.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../models/user";

export default function Home() {
  const imageUrl = "http://localhost:4400/";
  const { handleLoadUsers } = useUsers();
  const { userList } = useSelector((state: RootState) => state.users);

  const handleUsers = async () => {
    await handleLoadUsers();
  };

  console.log(userList);

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="loaded-route">
      <h1 className="home_title">HOME</h1>
      {userList.map((user: User) => (
        <div className="user_card">
          <div className="user_image">
            <figure>
              <img src={imageUrl + user.avatar.url} width={"200"}></img>
            </figure>
          </div>
          {/* {user.cars[0] ? (
            <div className="user_car">
              <figure>
                <img
                  src={imageUrl + user.cars[0].carPhoto.urlOriginal}
                  alt={imageUrl + user.cars[0].carModel}
                />
              </figure>
            </div>
          ) : (
            <div className="user_car">
              <span>NO CAR YET</span>
              <figure>
                <img
                  src="https://media.istockphoto.com/id/1214574077/photo/presentation-of-luxury-car-covered-with-cloth-on-dark-illuminated-by-orange-neon-light.jpg?s=612x612&w=0&k=20&c=KCXIH6vXzCzV-bYBxgkJDE2ATK-VHq6rfDRX2hU1gtc="
                  alt="Undefined car"
                />
              </figure>
            </div>
          )}

          {user.cars[0] ? (
            <div className="user_info">
              <span>{user.userName}</span>
              <span>{user.cars[0].carBrand}</span>
              <span>{user.cars[0].carModel}</span>
            </div>
          ) : (
            <div className="user_info">
              <span>{user.userName}</span>
              <span>{"This mf has no whip, what a brokie lmao"}</span>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
