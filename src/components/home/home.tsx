import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.user';
import './home.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { User } from '../../models/user';
import { Card } from '../card/card';
import { Filter } from '../filter/filter';

export default function Home() {
  const { handleLoadUsers } = useUsers();
  const { userList } = useSelector((state: RootState) => state.users);

  const handleUsers = async () => {
    await handleLoadUsers();
  };

  useEffect(() => {
    handleUsers();
  }, []);

  const checkUserList = () => {
    if (userList.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="loaded-route">
      <Filter></Filter>
      <div className="user_list" role="userList">
        {checkUserList() ? (
          userList.map((item: User) => <Card item={item} key={item.id}></Card>)
        ) : (
          <div className="result_filter">
            <h3>Lo sentimos, no hay usuarios de esta región.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
