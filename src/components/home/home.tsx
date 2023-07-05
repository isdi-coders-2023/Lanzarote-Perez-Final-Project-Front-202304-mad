import { useEffect } from "react";
import { useUsers } from "../../hooks/use.user";
import "./home.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../models/user";
import { Card } from "../card/card";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
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
      <InfiniteScroll
        dataLength={userList.length}
        next={handleLoadUsers}
        hasMore={true} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="user_list">
          {userList.map((item: User) => (
            <Card item={item} key={item.id}></Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
