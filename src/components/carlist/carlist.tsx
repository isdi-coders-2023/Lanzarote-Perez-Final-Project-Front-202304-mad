import { useSelector } from 'react-redux';
import { Car } from '../../models/car';
import { RootState } from '../../redux/store';
import { CarlistCard } from '../carlistCard/carlistcard';
import { User } from '../../models/user';
import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.user';

export function CarList() {
  const { handleLoadUsers } = useUsers();
  const { userData, userList } = useSelector((state: RootState) => state.users);

  const ReloadUserList = async () => {
    await handleLoadUsers();
  };

  const userToLoadCarsFrom = userList.find(
    (item: User) => item.id === userData.id
  );

  useEffect(() => {
    ReloadUserList();
  }, []);

  return (
    <div className="cars_container">
      {userToLoadCarsFrom?.cars.map((item: Car) => (
        <CarlistCard item={item} key={item.id}></CarlistCard>
      ))}
    </div>
  );
}
